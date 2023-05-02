const ctx = document.getElementById('graphT1');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1','2', '3','4','5','6'],
        datasets: [{
            label: 'Mètre par seconde',
            data: [4, 7, 9, 11, 12, 12, 12],
            borderWidth: 3,
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});