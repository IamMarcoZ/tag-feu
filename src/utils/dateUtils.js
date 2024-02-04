export const dateUtility = (function(){

    return {
        getTodaySessionId: getTodaySessionIdFn
    }

    // Formatta la data nel formato desiderato "ggmmaaaa"
    function getTodaySessionIdFn(){
        const dataCorrente = new Date();

        const giorno =  String(dataCorrente.getDate()).padStart(2, '0');
        const mese   =    String(dataCorrente.getMonth() + 1).padStart(2, '0'); 
        const anno   = dataCorrente.getFullYear();
        const hour   = dataCorrente.getHours();
        const sesionType = hour < 14 ? "MATTINA" : "SERA"

        const dataFormattata = `${giorno}${mese}${anno}`+"-"+sesionType;

        return dataFormattata;
    }

})();