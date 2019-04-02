const express = require('express');
const app = express();
const businessRoutes = express.Router();
const fs = require('fs');
// Require Business model in our routes module
let Business = require('../models/product');
let Catalog = require('../models/catalog')

businessRoutes.route('/addCatalog').post(function(req, res) {
    console.log("api catalog service")
    let catalog = new Catalog(req.body);
    catalog.save()
        .then(catalog => {
            res.status(200).json({ 'catalog': 'catalog in added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
businessRoutes.route('/getCatalogs').get(function(req, res) {
    Catalog.find(function(err, catalogs) {
        if (err) {
            console.log(err);
        } else {
            res.json(catalogs);
        }
    });
});
businessRoutes.route('/add').post(function(req, res) {
    let business = new Business(req.body);
    // let business = new Business;
    // console.log(req.body)
    // business.prod_name = req.body.prod_name;
    // business.prod_desc = req.body.prod_desc;
    // business.prod_price = req.body.prod_price;
    // business.updated_at = new Date();

    // business.image.data =req.body.image; //fs.readFileSync(req.body.image)
    // business.image.contentType = 'image/jpeg';

    business.save()
        .then(business => {
            res.status(200).json({ 'business': 'business in added successfully' });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// Defined get data(index or listing) route
businessRoutes.route('/:_cid').get(function(req, res) {
    let catalog = req.params._cid;
    let query = {};
    if (catalog === null || catalog === 'null') {
        query = {};
    } else {
        query.catalog = { $in: req.params._cid };
    }
    //{ "catalog": { $in: req.params._cid } }
    Business.find(query, function(err, businesses) {
        if (err) {
            console.log(err);
        } else {
            res.json(businesses);
        }
    });
});

// Defined edit route
businessRoutes.route('/edit/:_id').get(function(req, res) {
    let id = req.params._id;
    Business.findById(id, function(err, business) {
        res.json(business);
    });
});

//  Defined update route
businessRoutes.route('/update').put(function(req, res) {
    Business.findById(req.body._id, function(err, business) {

        // if (!business)
        //     return next(new Error('Could not load Document'));
        // else {
        business.prod_name = req.body.prod_name;
        business.prod_desc = req.body.prod_desc;
        business.prod_price = req.body.prod_price;
        business.updated_at = new Date();
        business.image = req.body.image;
        business.catalog = req.body.catalog;
        business.save().then(business => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send(err);
            });
        // }
    });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:_id').get(function(req, res) {
    Business.findByIdAndRemove({ _id: req.params._id }, function(err, business) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;