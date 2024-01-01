import { PostgrestSingleResponse, createClient } from "@supabase/supabase-js";
import { Case, Item } from './types';

type ItemExId = Omit<Item, "itemId">

export const SuBaDB = (url: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string, secret: string = process.env.SUPABASE_SERVICE_ROLE_KEY as string) => {
    const supabase = createClient(url, secret, {
        db: { schema: "public" },
    })
    return {
        async getItems(){
            const {data, error} = await supabase.from('items').select("*");
            if(data == null){
                return []
            }
            if(error){
                console.log(error);
            }
            return data;
        },
        async getItem(id: string){
            const {data, error} = await supabase.from('items').select().eq("itemId", id).maybeSingle();
            if(data == null){
                return []
            }
            if(error){
                console.log(error);
            }
            return data;
        },
        async addItem(item: Item){
            const {data, error} = await supabase.from("items").insert(item).select().single();
            if(error){
                console.log(error);
            }
            return data
        },
        async deleteItem(id: string){
            const {error} = await supabase.from("items").delete().eq("itemId", id);
            if(error){
                console.log(error);
            }
        },
        async updateItem(item: Item){
            const {data, error} = await supabase.from("items").update(item).eq("itemId", item.itemId).select().single()
            if(error){
                console.log(error);
            }
            return data;
        },
        async getCases(){
            const {data, error} = await supabase.from('cases').select("*");
            if(data == null){
                return []
            }
            if(error){
                console.log(error);
            }
            return data;
        },
        async getCase(id: string){
            const {data, error} = await supabase.from('cases').select().eq("caseId", id).maybeSingle();
            if(data == null){
                return []
            }
            if(error){
                console.log(error);
            }
            return data;
        },
        // async getItemsIdsFromCase(id: string){
        //     const {data, error} = await supabase.from('cases').select("items").eq("caseId", id);
        //     let items: {id: string}[] = data[0].items;
        //     return data;
        // },
        async getItemsFromCase(id: string){
            const {data, error} = await supabase.from('cases').select("items").eq("caseId", id);
            if(data){
                let itemsIds: {id: string}[] = data[0].items;
                let ids: string[] = itemsIds.map(i=> i.id);
                let items = await supabase.from("items")
                    .select("*").match({itemId: ids})
                if(items.data){
                    return items.data
                }
                return []
            }
            return []
        },
        async addCase(item: Case){
            const {data, error} = await supabase.from("cases").insert(item).select().single();
            if(error){
                console.log(error);
            }
            return data
        },
        async deleteCase(id: string){
            const {error} = await supabase.from("cases").delete().eq("caseId", id);
            if(error){
                console.log(error);
            }
        },
        async updateCase(item: Case){
            const {data, error} = await supabase.from("cases").update(item).eq("caseId", item.caseId).select().single()
            if(error){
                console.log(error);
            }
            return data;
        },
        async AddItemToCase(caseId: string, itemId: string){
            const {data, error} = await supabase.from('cases').select("items").eq("caseId", caseId);
            if(data){
                let items = data[0].items;
                items.push({id: itemId});
                await supabase.from('cases').update({"items":items}).eq('caseId', caseId)
            }    
        },
        async RemoveItemFromCase(caseId: string, itemId: string){
            const {data, error} = await supabase.from('cases').select("items").eq("caseId", caseId);
            if(data){
                let items: {id: string}[] = data[0].items;
                items = items.filter(i=> i.id != itemId);
                await supabase.from('cases').update({"items":items}).eq('caseId', caseId)
            }    
        },
        async SetOfItems(_items: string[]){
            let ids = Array.from(new Set(_items))
            let data = await supabase.from("items").select("*").match({"itemId": ids})
            if(data){
                return data.data;
            }
            return [];
        }
    }
}