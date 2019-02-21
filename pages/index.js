import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import Link from 'next/link';

//var contract = require("truffle-contract");
//var data = require("../build/contracts/TokenFactory.json");
//var tokenFactory = contract(data);

class tokenFactoryIndex extends Component {


    constructor(props) {
        super(props);
        this.state = {
             isAdmin : false
        };
    }

    async componentDidMount () {

    }

    handleAdminClick(e){        
        if(!this.state.isAdmin) e.preventDefault();
    }

    render(){   
        let adminButton;
        if(this.state.isAdmin){
            adminButton =  <Link href='/admin' onClick={this.handleAdminClick}>
                                <a>
                                    <Button primary fluid>Admin</Button>
                                </a>
                            </Link>;

        }else{
            adminButton = <Button primary fluid disabled>Admin</Button>;       
        }
        
        return (
            <Layout>
                <div>
                    <Link href='/createToken'>
                        <a>
                            <Button primary fluid>Create token</Button>
                        </a>
                    </Link>
                    <br />

                    {adminButton}                             
                </div>            
            </Layout>
        );
    }    
}

export default tokenFactoryIndex;