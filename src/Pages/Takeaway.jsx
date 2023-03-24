import React from 'react'
const Takeaway = () => {
    const paesedData = [
        {
            "id": 1,
            "name": "First Restaurant",
            "rating": "2",
            "items": [
                {
                    "id": 1,
                    "name": "First item",
                    "price": 200
                }
            ]
        },
        {
            "id": 2,
            "name": "Second Restaurant",
            "rating": "4",
            "items": [
                {
                    "id": 1,
                    "name": "Second item",
                    "price": 150
                },
                {
                    "id": 2,
                    "name": "Third item",
                    "price": 300
                }
            ]
        },
        {
            "id": 3,
            "name": "Italian Delight",
            "rating": "5",
            "items": [
                {
                    "id": 1,
                    "name": "Margherita Pizza",
                    "price": 400
                },
                {
                    "id": 2,
                    "name": "Pesto Pasta",
                    "price": 350
                }
            ]
        },
        {
            "id": 4,
            "name": "Burger Joint",
            "rating": "3",
            "items": [
                {
                    "id": 1,
                    "name": "Classic Burger",
                    "price": 250
                },
                {
                    "id": 2,
                    "name": "Bacon Cheeseburger",
                    "price": 350
                },
                {
                    "id": 3,
                    "name": "Veggie Burger",
                    "price": 200
                }
            ]
        },
        {
            "id": 5,
            "name": "Sushi Spot",
            "rating": "4.5",
            "items": [
                {
                    "id": 1,
                    "name": "California Roll",
                    "price": 500
                },
                {
                    "id": 2,
                    "name": "Spicy Tuna Roll",
                    "price": 600
                },
                {
                    "id": 3,
                    "name": "Salmon Nigiri",
                    "price": 350
                }
            ]
        },
        {
            "id": 6,
            "name": "Mexican Grill",
            "rating": "3.5",
            "items": [
                {
                    "id": 1,
                    "name": "Chicken Quesadilla",
                    "price": 300
                },
                {
                    "id": 2,
                    "name": "Beef Burrito",
                    "price": 350
                },
                {
                    "id": 3,
                    "name": "Veggie Fajitas",
                    "price": 250
                }
            ]
        },
        {
            "id": 7,
            "name": "Indian Spice",
            "rating": "4",
            "items": [
                {
                    "id": 1,
                    "name": "Butter Chicken",
                    "price": 450
                },
                {
                    "id": 2,
                    "name": "Naan Bread",
                    "price": 100
                },
                {
                    "id": 3,
                    "name": "Vegetable Samosas",
                    "price": 200
                }
            ]
        }
    ]
    return (
        <div>
            {
                paesedData.map((restaurant, index) => (
                    <>
                        <div>
                            <h1 className='h1 font-bold align-middle text-center m-3 text-xl '> {restaurant.name}</h1>
                        </div>
                        <div className='h-40%'>
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">Image</span>
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Product
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Qty
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {restaurant.items.map((item, index) => (
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td class="w-32 p-4">
                                                    {/* <img src="/docs/images/products/apple-watch.png" alt="Apple Watch"> */}
                                                </td>
                                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.name}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div class="flex items-center space-x-3">
                                                        <button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                            <span class="sr-only">Quantity button</span>
                                                            <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                                        </button>
                                                        <div>
                                                            <input type="number" id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                                                        </div>
                                                        <button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                            <span class="sr-only">Quantity button</span>
                                                            <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    ${item.price}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ))
            }
        </div>

    )
}

export default Takeaway