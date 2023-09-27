const express = require('express');
const router = new express.Router();
const ExpressError = require("../expressError")
const items = require("../fakeDb")


/** GET/items should render a list of shopping items */

router.get('/', (req, res, next) => {
    return res.json({ items })
})

/**POST/items should accept JSON data and add it to the shopping list */

router.post('/', (req, res, next) => {
    const newItem = { name: req.body.name, price: req.body.price}
    items.push(newItem)
    res.status(201).json({ item: newItem })
})

/**GET/items/:name should display a single item's name and price */

router.get('/:name', (req, res, next) => {
    const foundItem = items.find(items => items.name === req.params.name)
    if(foundItem === undefined){
        throw new ExpressError("Item not found", 404)
    }
    res.json({ item: foundItem })
})

/**PATCH/items/:name should modify a single item's name and/or price */
router.patch('/:name', (req, res, next) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined){
        throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name
    res.json({ item: foundItem })
})

/**DELETE/items/:name should allow you to delete a specific item from the array */
router.delete("/:name", (req, res) => {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if(foundItem === -1) {
        throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({ message: "Deleted"})
})
module.exports = router;