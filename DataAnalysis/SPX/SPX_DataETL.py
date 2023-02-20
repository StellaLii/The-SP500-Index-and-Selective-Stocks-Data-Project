import sys
assert sys.version_info >= (3, 5) 
from pyspark.sql import SparkSession, functions, types
from pyspark.sql.functions import col, to_date
from pyspark.sql.types import DoubleType, DateType
import pandas as ps
from statsmodels.tsa.seasonal import seasonal_decompose
import warnings
warnings.filterwarnings('ignore')


class spx_analysis(object):
    def __init__(self):
        self.data = spark.read.format("csv").load("DataSelection/S&PSPX.csv", header=True )

    def data_origin(self):
        df = self.data
        df.write.option("header",True).csv("DataAnalysis/SPX_Analysis/tmp/data_origin.csv")
        return df

    def data_review(self):
        df = self.data
        df = df.select(df.Date, df.Close)
        df.write.option("header",True).csv("DataAnalysis/SPX_Analysis/tmp/data_review.csv")
        return df

    def price_review(self):
        # S&P500 Index Price Review
        df = self.data
        df = df.select(df.Date, df.Open, df.Close)
        df.write.option("header",True).csv("DataAnalysis/SPX_Analysis/tmp/price_review.csv")
        return df

    def spx_return(self):
        # S&P500 Index return
        df = self.data
        tmp = df.withColumn("Return",(col("Close")-col("Open"))/col("Open")).select('Date', 'Return') 
        tmp.write.option("header",True).csv("DataAnalysis/SPX_Analysis/tmp/spx_return.csv")
        return tmp

if __name__ == '__main__':
    spark = SparkSession.builder.appName('SPX_Analysis').getOrCreate()
    assert spark.version >= '3.0' 
    spark.sparkContext.setLogLevel('WARN')
    sc = spark.sparkContext
    sa = spx_analysis()
    sa.data_origin()
    sa.data_review()
    sa.price_review()
    sa.spx_return()