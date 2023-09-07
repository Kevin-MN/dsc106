const assignment4 = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Initialize dataset with letters A-E
  var dataset = Array.from({ length: 5 }, (_, i) => ({
    x: alphabet[i],
    y: Math.floor(Math.random() * 20) + 1,
  }))
  
  
  // set variables, axes, scales here

var data_length = dataset.length;
let add_remove = true;

let margin = {
  top: 40,
  bottom: 40,
  left: 40,
  right: 40
};

  let width = 600 - margin.left - margin.right;
  let height = 300 - margin.top - margin.bottom;
  let padding = 40;


  let svg = d3.select("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);


  var g = svg.append("g")
  .attr("transform", `translate(${margin.left})`);
  
  let x_scale = d3.scaleBand()
  .domain(dataset.map(function (d) {return d.x;}))
  .range([padding,width - padding])
  .padding(0.1);
 
  let y_scale = d3.scaleLinear()
  .domain([0,20])
  .range([ height, padding]);


  d3.select('svg').append("g")
  .attr('id','x-axis')
  .attr("transform", "translate(0, "+ height + ")")
  .call(d3.axisBottom(x_scale)
  .tickFormat(function(d){ return d;}));
  
 
  d3.select('g').append("g")
  .call(d3.axisLeft(y_scale));
 

  //console.log(dataset.map(function (d) {return d.y;}))
  

  dataset_y_values =  dataset.map(function (d) {return d.y;});

  g.selectAll('.bar')
  .data(dataset_y_values)
  .enter()
  .append('rect')
  .attr('id', (d,i) => {return "rect-" + i;})
  .attr('class', 'bar')
  .attr('fill', 'skyblue')
  .attr('x', (d,i) =>  (i * x_scale.bandwidth()) +  (i * (padding/dataset.length)) + (margin.right)/ dataset.length)
  .attr('y', function(d) {return y_scale(d);})
  .attr('width', x_scale.bandwidth())
  .attr('height', function(d) { return height - y_scale(d); });

  



  // render bar chart
  const render = () => {
      
    data_length = dataset.length;

    if(add_remove == true){

      dataset_y_values =  dataset.map(function (d) {return d.y;});
      d3.select('svg')
      .selectAll('.bar')
      .data(dataset_y_values)
      .attr('class', 'bar')
      .attr('x', (d,i) =>  (i * x_scale.bandwidth()) +  (i * (padding/dataset.length)) + (margin.right)/ dataset.length + 2)
      .attr('y', function(d) {return y_scale(d);})
      .attr('width', x_scale.bandwidth())
      .attr('height', function(d) { return height - y_scale(d); })
      .transition()
      .attr('fill', 'steelblue');
    


      g.selectAll('.bar')
      .data(dataset_y_values)
      .enter()
      .append('rect')
      .attr('id', (d,i) => {return "rect-" + i;})
      .attr('class', 'bar')
      .attr('fill', 'skyblue')
      .attr('x', (d,i) =>  (i * x_scale.bandwidth()) +  (i * (padding/dataset.length)) + (margin.right/dataset.length + 2))
      .attr('y', function(d) {return y_scale(d);})
      .attr('width', x_scale.bandwidth())
      .attr('height', function(d) { return height - y_scale(d); })
      .transition();


    }
    else{


      d3.select('svg')
      .select(`#rect-${dataset.length}`)
      .style('fill','coral');

      dataset_y_values =  dataset.map(function (d) {return d.y;});
      d3.select('svg')
      .selectAll('.bar')
      .data(dataset_y_values)
      .attr('class', 'bar')
      .attr('x', (d,i) =>  (i * x_scale.bandwidth()) +  (i * (padding/dataset.length)) + (margin.right)/ dataset.length)
      .attr('y', function(d) {return y_scale(d);})
      .attr('width', x_scale.bandwidth())
      .attr('height', function(d) { return height - y_scale(d); })
      .attr('fill', 'steelblue');;


      d3.select('svg')
      .transition()
      .select(`#rect-${dataset.length}`)
      .remove();

      //console.log('inside remove render');

    }

  };



  // add bar
  const add = () => {
    
    if (dataset.length == 26){
      return;
    }

    dataset.push({
      x: alphabet[dataset.length],
      y:Math.floor(Math.random() * 20) + 1
    });
    
    //console.log(dataset);
    
    data_length++;
    //console.log(data_length);

    x_scale = d3.scaleBand()
    .domain(dataset.map(function (d) {return d.x;}))
    .range([padding,width - padding])
    .padding(0.1);

    d3.select('#x-axis')
    .call(d3.axisBottom(x_scale)
    .tickFormat(function(d){ return d;}));

    add_remove = true;

  };

  // remove bar
  const remove = () => {

    if (dataset.length == 0){
      return;
    }
    dataset.pop()
    
    //console.log(dataset)
    
    data_length--;
    //console.log(data_length)


    x_scale = d3.scaleBand()
    .domain(dataset.map(function (d) {return d.x;}))
    .range([padding,width - padding])
    .padding(0.1);

    d3.select('#x-axis')
    .call(d3.axisBottom(x_scale)
    .tickFormat(function(d){ return d;}));

    add_remove = false;

  };

  // threshold highlighting
  const threshold = () => {
    let thresh =  document.getElementById("thresholdNum").value;
    //console.log(thresh);
    
    data_pass = dataset.map(function (d) {return d.y;});
    index_bool = []
    for(let i = 0; i < dataset.length;i++){
      //console.log(data_pass[i] > thresh);
      //console.log(data_pass[i]);
      if (data_pass[i] > thresh){
        console.log('orange');
        d3.select('svg')
        .select(`#rect-${i}`)
        .transition()
        .attr('fill','orange');
      }
      else{
        console.log('gray');
        d3.select('svg')
        .select(`#rect-${i}`)
        .transition()
        .attr('fill','gray');
      
      }

    }
    
  

  };
  

  d3.selectAll('#add').on('click', function() { add(); render();});

  d3.selectAll('#remove').on('click', function() { remove(); render();});
  
  d3.selectAll('#thresholdBtn').on('click', function(){ threshold(); });



};
