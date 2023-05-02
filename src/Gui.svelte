<script>
        //Initialisation de l'array teamA
        let teamA = [
            {ms: 0, s: 0},
        ];
        
        function adddata() {
            // sert a donner un temps a chaque valeur de l'input
            let s = teamA.length;
            //recupere la valeur de l'input en Int
            let value = parseInt(event.target.value) ;
            //si la valeur est inferieur a 0 ou superieur a 12 alors on ne fait rien
            if (event.target.value <= 0 || event.target.value > 12) {
                return ;
            };
            //si la longueur de l'array est superieur ou egal a 7 alors on ne fait rien
            if (teamA.length >= 7) {
                console.log(teamA);
                return ;
            }
            //on ajoute la valeur de l'input dans l'array teamA
            const team = {
            ms:value,
            s:s++,
            };
            //on ajoute la valeur de l'input dans l'array teamA
            teamA = [team, ...teamA];
            //on vide l'input
            event.target.value = "";
        }
</script>
<div>
    <h3>TEAM A</h3>
    <div>
        <input type="number" id="inputNumber" on:keydown={event => event.key === 'Enter' && adddata(event.traget)} placeholder="m/s" min="0" max="12" >
        <span>s</span>
        <button on:click={console.log(teamA)}>Add</button>
    </div>
</div>
{#each teamA as team}
    <div class="table">
        <span>{team.ms}</span>
        <span>{team.s}</span>
    </div>
{/each}
<style>
    .table {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 50px;
        border: 1px solid black;
    }
    #inputNumber {
        width: 150px;
        height: 100%;
    }
</style>
