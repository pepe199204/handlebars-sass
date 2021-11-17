class loadDataFromJson{

    constructor(url){
        this.url = url;
    }
    async loadJsonAsync(){
        const response = await fetch(this.url);
        try{
            //validar la respuesta
            if(!response.ok){
                
                throw 'load rejected';
    
            }
            let result = response.json();
            return result;
    
        }catch(err){
    
            console.error(err);
        }
    }
}
class renderDataFromJson{
    constructor(data){
        this.data = data;
    }
    rendeJson(data){
        //console.log(data);
        infoContainer = data;
        renderData(infoContainer, filterIndex);
    }
}

const renderData = (data, index) => {

    let infoContainerFiltered = [{
        "products": [{
        }]
    }];
    if(index === 1){

        infoContainerFiltered.products = data.products.filter(
            (beer) => beer.filterId === 1);

           // console.log(infoContainerFiltered);

    }else if(index === 2){

        infoContainerFiltered.products = data.products.filter(
            (beer) => beer.filterId === 2);

            //console.log(infoContainerFiltered);

    }else if(index === 3){

        infoContainerFiltered.products = data.products.filter(
            (beer) => beer.filterId === 3);

            //console.log(infoContainerFiltered);

    }else{
        infoContainerFiltered = data;
    }

    const rawCreateBeer = document.getElementById('beers-template').innerHTML;
    const compileTemaplate = Handlebars.compile(rawCreateBeer);
    const generateTemplate = compileTemaplate(infoContainerFiltered);

    const beersContainer = document.getElementById('main-container-beers');
    beersContainer.innerHTML = generateTemplate;

    console.log(infoContainerFiltered, infoContainer);


}
const loadDataJson = new loadDataFromJson('static/data/products.json');
const renderDataJson = new renderDataFromJson(loadDataJson);

loadDataJson.loadJsonAsync().then(renderDataJson.rendeJson);

let infoContainer = [];

let filterIndex = 0;
document.addEventListener('click', (e) => {
    //let checkedValueSelected = document.querySelector('.messageCheckbox').value;

    if(e.target.id === 'filterBlonde'){

        //console.log('filterBlonde');
        

        document.getElementById("filterBlack").checked = false;
        document.getElementById("filterRed").checked = false;

        if(e.target.checked){
            console.log('ON filterBlonde');
            filterIndex = 1;
        }else{
            console.log('OFF filterBlonde');
            filterIndex = 0;
        }
        //console.log(checkedValueSelected, checkedValue);
        
    }
    if(e.target.id === 'filterBlack'){

        document.getElementById("filterBlonde").checked = false;
        document.getElementById("filterRed").checked = false;

        if(e.target.checked){
            console.log('ON filterBlack');
            filterIndex = 2;
        }else{
            console.log('OFF filterBlack');
            filterIndex = 0;
        }
    }
    if(e.target.id === 'filterRed'){

        document.getElementById("filterBlonde").checked = false;
        document.getElementById("filterBlack").checked = false;

        if(e.target.checked){
            console.log('ON filterRed');
            filterIndex = 3;
        }else{
            console.log('OFF filterRed');
            filterIndex = 0;
        }
    }
    if(e.target.id === 'applyFilter'){

        console.log('applyFilter');
        renderData(infoContainer, filterIndex);
        document.getElementById("modal").style.display = 'none';
        document.getElementById("applyFilterStick").style.display = 'flex';
    }
    if(e.target.id === 'cleanFilter'){

        console.log('cleanFilter');
        document.getElementById("filterBlonde").checked = false;
        document.getElementById("filterBlack").checked = false;
        document.getElementById("filterRed").checked = false;
        filterIndex = 0;
        document.getElementById("modal").style.display = 'none';
        document.getElementById("applyFilterStick").style.display = 'flex';
        renderData(infoContainer, filterIndex);
        
    }
    if(e.target.id === 'closeFilter'){
        console.log('closeFIlter');
        document.getElementById("modal").style.display = 'none';
        document.getElementById("applyFilterStick").style.display = 'flex';
    }
    if(e.target.id === 'applyFilterStick'){
        console.log('closeFIlter');
        document.getElementById("applyFilterStick").style.display = 'none';
        document.getElementById("beer-filter-container").style.display = 'flex';
        document.getElementById("modal").style.display = 'block';
      // document.getElementById("beer-filter-container").className = 'beer-filter-container';
    }

})
