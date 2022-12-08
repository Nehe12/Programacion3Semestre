/* <script>
        const ctx = document.getElementById('myChart');
        
               new Chart(ctx, {
                       type: 'bar',
                       data: {
                         labels: [
                           <% results.forEach((user)=> {  %>
                           '<%= user.category_name %>',
                           <%  } )  %>
                       ],
                         datasets: [{
                           label: '# of Votes',
                           data: [
                           <% results.forEach((user)=> {  %>
                           <%= user.cantidad %>,
                           <%  } )  %>
                           ],
                           borderWidth: 1
                         }]
                       },
                       options: {
                         scales: {
                           y: {
                             beginAtZero: true
                           }
                         }
                       }
                     });
         </script> */