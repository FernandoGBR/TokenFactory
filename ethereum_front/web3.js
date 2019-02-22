import Web3 from "web3";

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //App.web3Provider = window.web3.currentProvider;
    web3 = new Web3(window.web3.currentProvider);
} else {
    // If no injected web3 instance is detected, fallback to Ganache.
    //App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    //web3 = new Web3(App.web3Provider);
    web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
}

export default web3;