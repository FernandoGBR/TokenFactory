import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import Link from 'next/link';
//import Web3 from 'web3';
import getWeb3 from '../ethereum_front/web3';



class tokenFactoryIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
             isAdmin : false
        };
    }


    async componentDidMount () {
        try{
            var accounts;

            var contract = require("truffle-contract");
            var TokenFactory_JSON = require("../build/contracts/TokenFactory.json");
            var TokenFactory = contract(TokenFactory_JSON);
            var tokenFactory;

            //let web3 =new Web3(window.web3.currentProvider);
            let web3 = getWeb3();
            web3.eth.getAccounts(function(err, accs) {
                if (err != null) {
                    console.error("There was an error fetching your accounts.");
                    return;
                }
                if (accs.length == 0) {
                    console.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                    return;
                }
                accounts = accs;
            });
            var accounts = await web3.eth.getAccounts();

            
            TokenFactory.setProvider(web3.currentProvider);
            /*if (typeof TokenFactory.currentProvider.sendAsync !== "function") {
                TokenFactory.currentProvider.sendAsync = function() {
                    return TokenFactory.currentProvider.send.apply(
                        TokenFactory.currentProvider, arguments
                    );
                };
            }*/
            var tokenFactory;
            tokenFactory = await TokenFactory.deployed();
            var adminAddress = await tokenFactory.owner(); 
            adminAddress = adminAddress.toLowerCase();
            console.log('TF Owner acc:' + adminAddress);
            //var accounts = await web3.eth.getAccounts();
            //console.log('Acc at 0:' + accounts[0]); //<- OK
            var isAdmin = adminAddress == accounts[0];        
            this.setState({isAdmin});
        }catch(e){
            console.log(e);
        }
    }

    adminButton = () => {
        console.log('IsAdmin?:' + this.state.isAdmin);
        if(this.state.isAdmin){
            return (
                <Link href='./admin'>
                    <a>
                        <Button primary fluid>Admin</Button>
                    </a>
                </Link>
            );
        }else{
            return <Button primary fluid disabled>Admin</Button>;       
        }
        return "";
    }
    

    render(){   
        return (
            <Layout>
                <div>
                    <Link href='/createToken'>
                        <a>
                            <Button primary fluid>Create token</Button>
                        </a>
                    </Link>
                    <br />
                    {this.adminButton()}                             
                </div>            
            </Layout>
        );
    }    
}

export default tokenFactoryIndex;