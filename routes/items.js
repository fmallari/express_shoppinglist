const express = require('express');

const router = express.Router();

/** GET/items should render a list of shopping items */

router.get('', (req, res, next) => {
    return res.json({ items: Item.findAll() });
}

/**POST/items should accept JSON data and add it to the shopping list */

,router.post('', (req, res, next) => {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ item: newItem });
})

/**GET/items/:name should display a single item's name and price */

,router.get('/:name', (req, res, next) => {
    let foundItem = Item.find(req.params.name);
    return res.json({item:foundItem});
})

/**PATCH/items/:name should modify a single item's name and/or price */
,router.patch('/:name', (req, res, next) => {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({ item: foundItem});
})

/**DELETE/items/:name should allow you to delete a specific item from the array */

,router.delete('/:name', (req, res, next) => {
    Item.remove(req.params.name);
    return res.json({message: 'Deleted'});
}));

module.exports = router;