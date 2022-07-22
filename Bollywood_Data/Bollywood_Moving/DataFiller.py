#!/usr/bin/env python3
# To take the year wise data and fill data points in between to make smooth transitions during visualization

# import pandas module
import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn', suppressing warnings
 
# creating a data frame
df = pd.read_csv("<PATH>/dataC.csv")
# print(df.head())


def intermediates(p1, p2, nb_points):
    """"Return a list of nb_points equally spaced points
    between p1 and p2 which are like coordinates in 3D"""
    # If we have 8 intermediate points, we have 8+1=9 spaces, so we use nb_points+1
    # between p1 and p2
    x_spacing = (p2[0] - p1[0]) / (nb_points + 1)
    y_spacing = (p2[1] - p1[1]) / (nb_points + 1)
    z_spacing = (p2[2] - p1[2]) / (nb_points + 1)

    coord_list = [[p1[0] + i * x_spacing, p1[1] + i * y_spacing, p1[2] + i * z_spacing] for i in range(1, nb_points + 1)]
    return(coord_list)


df2 = df[0:0] ##empty dataframe with same column heads as df
num_fills = 60 ## number of points to fill between two points

for index in range(0,len(df)-6,6):
    print(index)
    ## x = rating, y = budget, z = PF     
    for k in range(0,6) :
        (x, y, z) = (df.iloc[index+k,3], df.iloc[index+k,4], df.iloc[index+k,5])
        (xt, yt, zt) = (df.iloc[index+k+6,3], df.iloc[index+k+6,4], df.iloc[index+k+6,5])
        list_values_beg = [x, y, z]
        list_values_end = [xt, yt, zt]
        values_list = intermediates(list_values_beg, list_values_end, nb_points=num_fills)
        df2.loc[len(df2)] = df.iloc[index+k]
        for j in range(0,len(values_list)):
            cur_list = values_list[j]
            cur_list.insert(0, df.iloc[index+k,2])
            cur_list.insert(0, df.iloc[index+k,1])
            cur_list.insert(0, df.iloc[index+k,0]+(j+1)/(num_fills+1))
            df2.loc[len(df2)] = cur_list     

index = len(df)-6    
for k in range(0,6) :
    (x, y, z) = (df.iloc[index+k,3], df.iloc[index+k,4], df.iloc[index+k,5])
    (xt, yt, zt) = (df.iloc[index+k,3], df.iloc[index+k,4], df.iloc[index+k,5])
    list_values_beg = [x, y, z]
    list_values_end = [xt, yt, zt]
    values_list = intermediates(list_values_beg, list_values_end, nb_points=num_fills)
    df2.loc[len(df2)] = df.iloc[index+k]
    for j in range(0,len(values_list)):
        cur_list = values_list[j]
        cur_list.insert(0, df.iloc[index+k,2])
        cur_list.insert(0, df.iloc[index+k,1])
        cur_list.insert(0, df.iloc[index+k,0]+(j+1)/(num_fills+1))
        df2.loc[len(df2)] = cur_list            

  
df2.to_csv('<PATH>/dataC_output.csv')     

