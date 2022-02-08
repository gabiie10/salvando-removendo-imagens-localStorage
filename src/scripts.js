import React from "react";
const Imagem=()=>{
    //variaveis
    let favorites=JSON.parse(localStorage.getItem('favorites')) || []
    const imageContainer=document.querySelector('.image')
   const button= document.querySelector('button')

   
    //events
    button.onclick=()=>updateImage()
    imageContainer.onclick=()=>updateAll()
    //Methods
    function getState(){
        const imageSource=document.querySelector('.image img').src 

        const index=favorites.indexOf(imageSource)
        const existInLocalStorage=index!==-1
        return {imageSource,index,existInLocalStorage}
    }
    function updateAll(){
            updateFavorites()
            updateClasses()
      
    }
    function updateFavorites(){
        const {existInLocalStorage,index,imageSource}= getState()
        if(existInLocalStorage){
            favorites.splice(index,1)
        }
        else{//salvar no localStorage
           favorites.push(imageSource) 
        }
       
        localStorage.setItem('favorites',JSON.stringify(favorites))
    }
    function updateClasses(){
        const {existInLocalStorage}= getState()
        imageContainer.classList.remove('fav')
        if(existInLocalStorage){
           imageContainer.classList.add('fav')
        } 
    }
    async function updateImage(){
       await getExternalImage()
       updateClasses()
    }
    async function getExternalImage(){
        const response= await fetch('https://source.unsplash.com/random')
    
        imageContainer
        .innerHTML=`<img src="${response.url}">`
    }
    getExternalImage()
    
}

export default Imagem;