import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import Link from 'next/link';
//import Web3 from 'web3';
import web3 from '../ethereum_front/web3';


try{
    var contract = require("truffle-contract");
    var TokenFactory_JSON = require("../build/contracts/TokenFactory.json");
    var TokenFactory = contract(TokenFactory_JSON);

    console.log("Web3 provider:" + JSON.stringify(web3.currentProvider) + "\n"); //<-- OK, creo
    console.log("networks: " + JSON.stringify(TokenFactory.networks) + "\n");

    TokenFactory.setProvider(web3.currentProvider);

    var tokenFactory;
    TokenFactory.deployed().then( ret => {
        tokenFactory = ret;
    }).catch(e => {
        console.log("error1");
        //console.log(e.message);
    });
}catch(e){
    console.log("error2");
    //console.log(e.message);
}



class tokenFactoryIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
             isAdmin : false
        };
    }


    async componentDidMount () {
        try{
            var adminAddress = await tokenFactory.owner(); 
            console.log('TF Owner acc:' + adminAddress);
            var accounts = await web3.eth.getAccounts();
            console.log('Acc at 0:' + accounts[0]); //<- OK
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