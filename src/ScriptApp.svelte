<script>
    let teamA = [
        {ms:6,s:1},
        {ms:8.5,s:2},
        {ms:10,s:3},
        {ms:12,s:4},
        {ms:12,s:6 },  
    ];
    let ResultatVistesse = [];
    let distance = [];
    function Vistesse(ms,s) {
        function Vitesse(ms, s) {
        let v = ms / s;
        // vistesse en km/h
        v = v * 3.6;
        console.log(v);
        ResultatVistesse.push(v);
        //distance 
        let d = v * s;
        distance.push(d);
        console.log(`la distance est ${d} m en ${s} s`);

    };

    for (let obj of teamA) {
        Vitesse(obj.ms, obj.s);
    }
    
        
    };
    Vistesse(teamA[0].ms,teamA[0].s); 
    console.log("résultat de toutes les valeur de vistesse sous la forme d'un tableau"); 
    console.log(ResultatVistesse);
    console.log("résultat de toutes les valeur de distance sous la forme d'un tableau");
    console.log(distance);
    //addiction toute les valeur de distance jusqu'a que la distance soit superieur a 50m
    let somme = 0;
    for (let i = 0; i < distance.length; i++) {
        somme += distance[i];
        if (somme > 15) {
            console.log(`la distance est de ${somme} m`);
            break;
        }
    }
</script>