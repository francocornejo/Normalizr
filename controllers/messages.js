class messages{
    constructor(config, table){
        try{
            this.table = table;
            this.config = config;

            config.schema.hasTable(table).then(exists => {
                if (!exists) {
                    return config.schema.createTable(table, tab => {
                        tab.increments('id').notNullable().primary();
                        tab.string('nombre')
                        tab.string('apellido')
                        tab.string('edad')
                        tab.string('alias')
                        tab.string('avatar')
                        tab.string('email', 70).notNullable();
                        tab.string('date', 50);
                        tab.string('message').notNullable();
                    });
                }
            })}catch(err){
                console.log(err)
            } 
        }

        async addMessage(authors , comments ){

            const date = new Date().toLocaleString()

            const datos = {
                nombre : authors.nombre,
                apellido: authors.apellido,
                edad: authors.edad,
                alias: authors.alias,
                avatar: authors.avatar,
                email: authors.email,
                date: date,
                message: comments.message
            } 

            const messages= await this.config.from(this.table).insert(datos)

            return messages 
        }

        async getMessages(){

            let rows= await this.config.from(this.table).select("*")

            rows.forEach((article)=>{ console.log(`${article['id']} ${article['email']} ${article['date']}: ${article['message']}`) })

            return rows
        }
}

export default messages