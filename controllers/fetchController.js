const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
require("dotenv").config()

const getData = async (req, res) => {
	getResult(function(result) {
		res.json(result).status(result.status);
	})
}

const getDataOrder = async (req, res) => {
	getResult(function(result) {

		result.data.sort(sortFunction);

		result.data.forEach(val => {
			delete val.id;
			delete val.createdAt;
			delete val.price;
		})

		res.json(result).status(result.status);
	})
}

function getResult(result) {
	getCurrency(function(callbackCurrency) {
		if (callbackCurrency.status == 200) {
			getProduct(function(callbackProduct) {
				result({
					status: 200,
					data: buildData(callbackProduct.data, callbackCurrency.data.USD_IDR)
				})
			});
		} else {
			res.json(callbackCurrency).status(callbackCurrency.status);
		}
	});
}

function getCurrency(callbackCurrency) {
	const requestOptions = {
		method: 'GET'
	};
	const apiKey = 'd1ded944220ca6b0c442';

	fetch("https://free.currencyconverterapi.com/api/v5/convert?q=USD_IDR&compact=ultra&apiKey="+apiKey,
	requestOptions).then(response => 
		response.json()
	).then(result => 
		callbackCurrency({
			status: 200,
			data: result
		})
	).catch(error => 
		callbackCurrency({
			status: 422,
			data: error
		})
	);
}

function getProduct(callbackProduct) {
	const requestOptions = {
		method: 'GET'
	};

	fetch("https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product",
	requestOptions).then(response => 
		response.json()
	).then(result => 
		callbackProduct({
			status: 200,
			data: result
		})
	).catch(error => 
		callbackProduct({
			status: 422,
			data: error
		})
	);
}

function buildData(data, currency) {
	let newData = [];

	data.forEach(val => {
		val.price_idr = convertRupiah((val.price * currency).toFixed(2));
		newData.push(val);
	});

	return newData;
}

function convertRupiah(bilangan) {
	let number_string = bilangan.toString()
	let split = number_string.split('.')
	let sisa = split[0].length % 3
	let rupiah = split[0].substr(0, sisa)
	let ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

	if (ribuan) {
		separator = sisa?',':'';
		rupiah += separator+ribuan.join(',');
	}

	return split[1]!=undefined?rupiah+'.'+split[1]:rupiah;
}

function sortFunction(a, b) {
	let a_ = Number(a.price_idr.replace(/,/g, ''));
	let b_ = Number(b.price_idr.replace(/,/g, ''));

	if (a_ === b_) {
		return 0;
	} else {
		return (a_ < b_) ? -1 : 1;
	}
}

module.exports = {
    getData,
    getDataOrder
}