import React from 'react';
import {supabase} from "../lib/initSupabase";
import Layout from "../components/Layout";

const Filmes = ({user}) => {
    return (
        <Layout title={"Filmes"}>
            <h1>Filmes</h1>
            <p>
              
            </p>
            <p>
                Email: {user.email}
            </p>
        </Layout>
    );
};

export default Filmes;



export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        // force supabase sign out
        await supabase.auth.signOut()

        return {
            props: {expired: true}, redirect: {destination: '/login'}
        }
    }

    return {
        props: { user }
                    
        }
        
    }

