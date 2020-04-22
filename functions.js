setInterval(function(){
	
},1000/4); // Loops every 1/4 seconds.

character.items.forEach((i) => { game_log(i); });

function compoundItem(id, minimumItemsLeft, maxLevel)
{
    let itemsLeft = 0;
	let done = false;
    character.items.forEach((i) => { if(i && i.name==id) itemsLeft++ });
    if(itemsLeft > minimumItemsLeft)
    {
        for(let level = 0; level <= maxLevel; level++)
        {
            for(let i = 0; i < character.items.length; i++)
            {
                if(character.items[i] && character.items[i].name==id && character.items[i].level == level)
                {
                    for(let j = i+1; j < character.items.length; j++)
                    {
                        if(character.items[j] && character.items[j].name==id && character.items[j].level == level)
                        {
                            for(let k = j+1; k < character.items.length; k++)
                            {
                                if(character.items[k] && character.items[k].name==id && character.items[k].level == level && !done && !character.q.compound)
                                {
									done = true;
                                    if(locate_item("cscroll1") == -1)
                                        buy("cscroll1",1);
                                    compound(i,j,k,locate_item("cscroll1"), null);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function sortInventory()
{
    fixInventoryGaps();
    for(let i = 0; i < character.items.length; i++)
    {
        if(character.items[i] == null)
            continue;
        let min_index = i;
        let cur_value = G.items[character.items[min_index].name].type + G.items[character.items[min_index].name].id;
        for(let j = i+1; j < character.items.length; j++)
        {
            if(character.items[j] == null)
                continue;
            let value = G.items[character.items[j].name].type + G.items[character.items[j].name].id;
            if(value < G.items[character.items[min_index].name].type + G.items[character.items[min_index].name].id)
                min_index = j;
        }
        if(min_index != i)
            swap(i, min_index);
    }
}

function fixInventoryGaps()
{
    for(let i = character.items.length-1; i > 0; i--)
    {
        if(character.items[i] && !character.items[i-1])
        {
            swap(i, i-1);
        }
    }
}