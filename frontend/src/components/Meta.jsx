import {Helmet} from 'react-helmet-async'

const Meta = ({title, description, keywords}) => {
   return(
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
    </Helmet>
   ) 
}

Meta.defaultProps ={
    title: "Bem vindo a EletroFix",
    description: "Venda de Eletrodomésticos",
    keywords: "eletrodomesticos, compras"
}

export default Meta