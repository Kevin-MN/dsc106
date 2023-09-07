function assignment5(){
    let filePath="data.csv";
    question0(filePath); //preprocess data 
 
}

let question0=function(filePath){
    
    
    d3.csv(filePath).then(function(data){
    console.log(data);
    //preprocess data here
   
    var parseTime = d3.timeParse("%Y")
    console.log(typeof data[0]['Year']);
        
    let basketBallPlayers = d3.group(data, d => d.Sport).get('Basketball');
    
    let basketball_height_weight_data = [];
    for(let i =0; i < basketBallPlayers.length; i++){
        if(parseInt(basketBallPlayers[i]['Year']) > 2010){
            basketball_height_weight_data.push({'Weight':parseInt(basketBallPlayers[i]['Weight']),"Height" :parseFloat(basketBallPlayers[i]['Height']),"Sex":basketBallPlayers[i]['Sex']})

        }
    }


    let usa = [];
    let china = [];
    let australia = [];

    for(let i =0; i < data.length; i++){
        if(parseInt(data[i]['Year']) > 1980){
            if(data[i]['Team'] == 'USA'){
                usa.push(data[i])
            }
            if(data[i]['Team'] == 'China'){
                china.push(data[i])
            }
            if(data[i]['Team'] == 'Australia'){
                australia.push(data[i])
            }
        }
    }

    console.log(usa)
    console.log(china)
    console.log(australia)

   
    let usa_rollup = d3.flatRollup(usa, d => {return d.length}, d => parseInt(d.Year)).sort()
    let china_rollup = d3.flatRollup(china, d => {return d.length}, d => parseInt(d.Year)).sort()
    let australia_rollup = d3.flatRollup(australia, d => {return d.length}, d => parseInt(d.Year)).sort()
    



    console.log(usa_rollup)
    console.log(china_rollup)
    console.log(australia_rollup)
   

    question1(basketball_height_weight_data);
    question2(usa_rollup, china_rollup, australia_rollup);
    question3(data);
    });
    
}

let question1=function(data){
   // create plot inside the div #q1_plot
      

    margin = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    }

    width = 500 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;



    let svg = d3.select("#q1_plot")
    .append('svg')
    .attr('id', 'svg1')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," +  margin.top + ")");


    max_height = d3.max(data, d=>d.Height);
    min_height = d3.min(data, d=>d.Height);
    max_weight = d3.max(data, d=>d.Weight);
    min_weight = d3.min(data, d=>d.Weight);
    console.log(d3.extent(data, d=> d.weight));
    console.log(d3.data, d=>d.Weight)
    console.log(d3.max(data))


    var x_scale = d3.scaleLinear()
    .domain([min_height - 5, max_height + 5])
    .range([0, width]);

    var y_scale = d3.scaleLinear()
    .domain([min_weight - 5, max_weight + 5])
    .range([height,0]);


    

    svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_scale));
   
   svg.append("g")
   .call(d3.axisLeft(y_scale));


    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x_scale(d.Height); } )
        .attr("cy", function (d) { return y_scale(d.Weight); } )
        .attr("r", 5)
        .style("fill", (d) => {return (d.Sex == 'M' ? "Orange" : "Blue");});


        svg.append('text')
        .attr('x', width/2 )
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 20)
        .text('Height vs. Weight of Baskteball Players');
        
        // X label
        svg.append('text')
        .attr('x', width/2 )
        .attr('y', height + 35)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Height');
        
        // Y label
        svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(-30,' + height/2 + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Weight');



        svg.append("circle").attr("cx",20).attr("cy",30).attr("r", 6).style("fill", "Orange")
        svg.append("circle").attr("cx",20).attr("cy",60).attr("r", 6).style("fill", "Blue")
        svg.append("text").attr("x", 40).attr("y", 30).text("Male").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 60).text("Female").style("font-size", "15px").attr("alignment-baseline","middle")
}

let question2=function(data1,data2,data3){
    // create plot inside the div #q2_plot
      
    margin = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    }

    width = 500 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;



    let svg = d3.select("#q2_plot")
    .append('svg')
    .attr('id', 'svg2')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," +  margin.top + ")");
      


    var x = d3.scaleLinear()
    .domain(d3.extent(data1, function(d) { return d[0]; }))
    .range([ 0, width ]);

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
    .domain( [0, d3.max(data1, d => d[1])])
    .range([ height, 0 ]);

    svg.append("g")
    .call(d3.axisLeft(y));

    svg.append("path")
    .datum(data1)
    .attr('class', 'line')
    .attr("fill", "none")
    .attr("stroke", "Blue")
    .attr("stroke-width", 1.5)
    .style("stroke-dasharray", ("3,3"))
    .attr("d", d3.line()
      .x(function(d) { return x(d[0]) })
      .y(function(d) { return y(d[1]) }))

      svg
      .append("g")
      .selectAll("dot")
      .data(data1)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d[0]) } )
        .attr("cy", function(d) { return y(d[1]) } )
        .attr("r", 2)
       
        .attr("fill", "Blue")


        svg.append("path")
        .datum(data2)
        .attr("fill", "none")
        .attr("stroke", "Green")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d[0]) })
          .y(function(d) { return y(d[1]) }))
    
          svg
          .append("g")
          .selectAll("dot")
          .data(data2)
          .enter()
          .append("circle")
            .attr("cx", function(d) { return x(d[0]) } )
            .attr("cy", function(d) { return y(d[1]) } )
            .attr("r", 2)
            .attr("fill", "Green")

            svg.append("path")
            .datum(data3)
            .attr("fill", "none")
            .attr("stroke", "Orange")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
              .x(function(d) { return x(d[0]) })
              .y(function(d) { return y(d[1]) }))
        
              svg
              .append("g")
              .selectAll("dot")
              .data(data3)
              .enter()
              .append("circle")
                .attr("cx", function(d) { return x(d[0]) } )
                .attr("cy", function(d) { return y(d[1]) } )
                .attr("r", 2)
                .attr("fill", "Orange")




                svg.append('text')
                .attr('x', width/2 )
                .attr('y', 0)
                .attr('text-anchor', 'middle')
                .style('font-family', 'Helvetica')
                .style('font-size', 20)
                .text('Medals earned by country');
                
                // X label
                svg.append('text')
                .attr('x', width/2 )
                .attr('y', height + 35)
                .attr('text-anchor', 'middle')
                .style('font-family', 'Helvetica')
                .style('font-size', 12)
                .text('Year');
                
                // Y label
                svg.append('text')
                .attr('text-anchor', 'middle')
                .attr('transform', 'translate(-30,' + height/2 + ')rotate(-90)')
                .style('font-family', 'Helvetica')
                .style('font-size', 12)
                .text('Medals');
        
        
        
                svg.append("circle").attr("cx",350).attr("cy",360).attr("r", 6).style("fill", "Orange")
                svg.append("circle").attr("cx",350).attr("cy",380).attr("r", 6).style("fill", "Blue")
                svg.append("circle").attr("cx",350).attr("cy",400).attr("r", 6).style("fill", "Green")
                svg.append("text").attr("x", 370).attr("y",360).text("Australia").style("font-size", "15px").attr("alignment-baseline","middle")
                svg.append("text").attr("x", 370).attr("y", 380).text("USA").style("font-size", "15px").attr("alignment-baseline","middle")
                svg.append("text").attr("x", 370).attr("y", 400).text("China").style("font-size", "15px").attr("alignment-baseline","middle")
        }

















let question3=function(data){
    // create plot inside the div #q3_plot
    margin = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    }

    width = 500 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;



    let svg = d3.select("#q3_plot")
    .append('svg')
    .attr('id', 'svg3')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," +  margin.top + ")");

    












   
      
}


