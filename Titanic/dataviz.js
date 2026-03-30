    // set the dimensions and margins of the graph
    var margin = {top: 80, right: 80, bottom: 10, left: 100},
      width = 900 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#parallel_coords")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // Parse the Data
    d3.csv("https://raw.githubusercontent.com/bbdataviz/Dataviz-Projects/refs/heads/main/Titanic/titanicData-red-sx.csv", function(data) {
        
    
      // Color scale: 
      var color = d3.scaleOrdinal()
        .domain(["Survived", "Died"])
        .range([ "#FF670066", "#00335Fff"]) //#003C5Fff
    
      dimensions = ["Sex", "Age", "PassengerClass"]
    
    
      // For each dimension, I build a linear scale. 
       
      var y = {}
      for (i in dimensions) {
        name = dimensions[i]
        y[name] = d3.scaleLinear()
          .domain( d3.extent(data, function(d) { return +d[name]; }) )
          .range([height, 0])
        
        y["Sex"] = d3.scalePoint()
          .domain(["female", "male"])
          .range([height, 0])
        
        y["PassengerClass"] = d3.scalePoint()
          .domain(["1", "2", "3"])
          .range([height, 0])

      }
    
      // Build the X scale -> it finds the best position for each Y axis
      x = d3.scalePoint()
        .range([0, width])
        .domain(dimensions);
    
      // Highlight the specie that is hovered
      var highlight = function(d){
    
        surviver = d.Surviver
    
        // first every group turns grey
        d3.selectAll(".line")
          //.transition().duration(1000)
          .style("stroke", "grey")
          .style("stroke-width", "2pt")
          .style("opacity", "0.8")
          
        // Second the hovered group (survive or died) takes its color
        d3.selectAll("." + surviver )
          //.transition().duration(10)
          .style("stroke", color(surviver))
          .style("stroke-width", "3pt")
          .style("opacity", "0.8")
      }
    
      // Unhighlight
      var doNotHighlight = function(d){
        d3.selectAll(".line")
          //.transition().duration(1000000).delay(100000) 
          .style("stroke", function(d){ return( color(d.Surviver))} )
          .style("stroke-width", "2pt")
          .style("opacity", "0.5")
      }
    
      // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
      function path(d) {
          return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
      }
    
      // Draw the lines
      svg
        .selectAll("myPath")
        .data(data)
        .enter()
        .append("path")
          .attr("class", function (d) { return "line " + d.Surviver } ) // 2 class for each line: 'line' and the group name
          .attr("d",  path)
          .style("fill", "none" )
          .style("stroke", function(d){ return( color(d.Surviver))} )
          .style("stroke-width", "2pt")
          .style("opacity", 0.7)
          .on("mouseover", highlight)
          .on("mouseleave", doNotHighlight )
    
      // Draw the axis:
      svg.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        .attr("class", "axis")
        // I translate this element to its right position on the x axis
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function(d) { 
            d3.select(this).call(d3.axisLeft().scale(y[d])) ; })
        // Add axis title
        .append("text")
          .style("text-anchor", "middle")
          .attr("y", -25)
          .text(function(d) { return d; })
          .style("fill", "white")
    
    })    // set the dimensions and margins of the graph
    var margin = {top: 80, right: 80, bottom: 10, left: 100},
      width = 900 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#parallel_coords")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // Parse the Data
    d3.csv("https://raw.githubusercontent.com/bbdataviz/Dataviz-Projects/refs/heads/main/Titanic/titanicData-red-sx.csv", function(data) {
        
    
      // Color scale: 
      var color = d3.scaleOrdinal()
        .domain(["Survived", "Died"])
        .range([ "#FF670066", "#00335Fff"]) //#003C5Fff
    
      dimensions = ["Sex", "Age", "PassengerClass"]
    
    
      // For each dimension, I build a linear scale. 
       
      var y = {}
      for (i in dimensions) {
        name = dimensions[i]
        y[name] = d3.scaleLinear()
          .domain( d3.extent(data, function(d) { return +d[name]; }) )
          .range([height, 0])
        
        y["Sex"] = d3.scalePoint()
          .domain(["female", "male"])
          .range([height, 0])
        
        y["PassengerClass"] = d3.scalePoint()
          .domain(["1", "2", "3"])
          .range([height, 0])

      }
    
      // Build the X scale -> it finds the best position for each Y axis
      x = d3.scalePoint()
        .range([0, width])
        .domain(dimensions);
    
      // Highlight the specie that is hovered
      var highlight = function(d){
    
        surviver = d.Surviver
    
        // first every group turns grey
        d3.selectAll(".line")
          //.transition().duration(1000)
          .style("stroke", "grey")
          .style("stroke-width", "2pt")
          .style("opacity", "0.8")
          
        // Second the hovered group (survive or died) takes its color
        d3.selectAll("." + surviver )
          //.transition().duration(10)
          .style("stroke", color(surviver))
          .style("stroke-width", "3pt")
          .style("opacity", "0.8")
      }
    
      // Unhighlight
      var doNotHighlight = function(d){
        d3.selectAll(".line")
          //.transition().duration(1000000).delay(100000) 
          .style("stroke", function(d){ return( color(d.Surviver))} )
          .style("stroke-width", "2pt")
          .style("opacity", "0.5")
      }
    
      // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
      function path(d) {
          return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
      }
    
      // Draw the lines
      svg
        .selectAll("myPath")
        .data(data)
        .enter()
        .append("path")
          .attr("class", function (d) { return "line " + d.Surviver } ) // 2 class for each line: 'line' and the group name
          .attr("d",  path)
          .style("fill", "none" )
          .style("stroke", function(d){ return( color(d.Surviver))} )
          .style("stroke-width", "2pt")
          .style("opacity", 0.7)
          .on("mouseover", highlight)
          .on("mouseleave", doNotHighlight )
    
      // Draw the axis:
      svg.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        .attr("class", "axis")
        // I translate this element to its right position on the x axis
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function(d) { 
            d3.select(this).call(d3.axisLeft().scale(y[d])) ; })
        // Add axis title
        .append("text")
          .style("text-anchor", "middle")
          .attr("y", -25)
          .text(function(d) { return d; })
          .style("fill", "white")
    
    })
