//stores the final result of categories with parent categores and child categories sequence is taken care.
var finalResult = []

function sortCategoriesForInsert (inputJson) {
  //map to store the ID as the key, and jsonItem as the value with child array which stores the sub categories
  const map = new Map();

  //construct the map with key as ID
  inputJson.forEach(input => map.set(input.id,{node: input,child:[]}))

  let arr = [];
  //updating the categories with the subcategories.
  inputJson.forEach((input)=>{
    if(input.parent_id != null){
      map.get(input["parent_id"]).child.push(map.get(input.id));
    }else{
      arr.push(map.get(input.id));
    }
  })
  

  //converting the mapped data to array.
  arr.forEach(element =>convertToArray(element));
  return finalResult;

}

//recursive function to createback the final array. 
function convertToArray(arr){
  if(arr && arr.child){
    finalResult.push(arr.node);
    arr.child.forEach(child=> convertToArray(child))
    
  }
}

function clearArray(){
  finalResult = []
}

console.log("One parent category:-",sortCategoriesForInsert ([
  {
    "name": "Accessories",
    "id": 1,
    "parent_id": 20,
  },
  {
    "name": "Watches",
    "id": 57,
    "parent_id": 1
  },
  {
    "name": "Men",
    "id": 20,
    "parent_id": null
  }
]))

clearArray();
//multiple parents
console.log("mulitple parents:-",sortCategoriesForInsert ([
  {
    "name": "Accessories",
    "id": 1,
    "parent_id": 20,
  },
  {
    "name": "Watches",
    "id": 57,
    "parent_id": 1
  },
  {
    "name": "Men",
    "id": 20,
    "parent_id": null
  },
  {
    "name": "FootWear",
    "id": 2,
    "parent_id": 21,
  },
  {
    "name": "Shoes",
    "id": 58,
    "parent_id": 2
  },
  {
    "name": "Women",
    "id": 21,
    "parent_id": null
  }
]))
clearArray();
console.log("One parent category | nesting more than 3 levels:-",sortCategoriesForInsert ([
  {
    "name": "Accessories",
    "id": 1,
    "parent_id": 20,
  },
  {
    "name": "Watches",
    "id": 57,
    "parent_id": 1
  },
  {
    "name": "Rolex",
    "id": 58,
    "parent_id": 57
  },
  {
    "name": "Rolex-version-1",
    "id": 59,
    "parent_id": 58
  },
  {
    "name": "Men",
    "id": 20,
    "parent_id": null
  }
]))
clearArray();
console.log("One parent category | multiple children per parent:-",sortCategoriesForInsert ([
  {
    "name": "Accessories",
    "id": 1,
    "parent_id": 20,
  },
  {
    "name": "Clothes",
    "id": 2,
    "parent_id": 20,
  },
  {
    "name": "Shirts",
    "id": 3,
    "parent_id": 2,
  },
  {
    "name": "Watches",
    "id": 57,
    "parent_id": 1
  },
  {
    "name": "Rolex",
    "id": 58,
    "parent_id": 57
  },
  {
    "name": "Rolex-version-1",
    "id": 59,
    "parent_id": 58
  },
  {
    "name": "Men",
    "id": 20,
    "parent_id": null
  }
]))