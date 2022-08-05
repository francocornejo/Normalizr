import { faker } from '@faker-js/faker';
const info= [];

export const randomProduct = (req, res) => {
    for (let i = 1; i <= 5; i++) {
        info.push({
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            foto: faker.image.image()
        })
    }

    console.log(info)

    res.status(201).render('plantilla', {info})
}
