
const {createApp, ref} = Vue;

const apps =  createApp({
    // template: `
 
    
    // `,
    setup(){
        const message = ref("I am Goku")
        const author = ref("Planeta veggeta")

        const changeQuote = () => {
            message.value =' Soy vegeta'
            author.value = "Y soy el rey"
        }
        setTimeout(() => {
            message.value = 'Soy Goku'
            author.value ='Soy de la tierra'
        }, 1000);
        return {message, author, changeQuote}
    }
})


apps.mount('#myapp')



