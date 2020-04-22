setInterval(function(){
	sortInventory();
},1000/4); // Loops every 1/4 seconds.

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