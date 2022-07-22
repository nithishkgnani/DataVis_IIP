## Bollywood Profitability for different genres
The budget and profitability of six most popular genres in Bollywood movies from 2005 to 2017 indicated by flowers.

* More number of petals <-> higher profits
* Less number of petals <--> loss, indicated by discoloration of the flower
* Bigger flower <-> more money was spent to make movies of that genre

To visualize right away, add the sketch and json files in p5 editor and run sketch.js.  
Output should look like the below figure.

<img src="Bollywood_profitability_by_Nithish.gif" width="auto">  

### Instructions

* _dataC.csv_ is the data taken from IIP's Bollywood dataset. This can be directly used to visualize the data
but there will not be smooth transitions between the years as the values can vary by large amounts
* Run the Python script _DataFiller.py_ to get a new dataset with data points in between the original data
The _num\_fills_ variable determines the number of points filled between the existing data.
* Convert it to json format using an online converter or using your own method
* In the sketch.js script, set the _smoothness_ variable to _num\_fills + 1_
* Add the dataset json file and the sketch.js script to p5 editor and run the sketch to see the result