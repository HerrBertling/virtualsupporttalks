const Brevo = () => {
return (
<><script src="https://cdn.brevo.com/js/sdk-loader.js" async></script>
<script dangerouslySetInnerHTML={{
    __html: `window.Brevo = window.Brevo || []; Brevo.push(["init",{client_key: "ir90lm6djp5yl513z778118q"}]);`
}}/>
    
</>)
}

export default Brevo;