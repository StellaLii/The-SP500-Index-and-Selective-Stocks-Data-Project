import sys
assert sys.version_info >= (3, 5) # make sure we have Python 3.5+
from pyspark.sql import SparkSession, functions, types
from functools import reduce


def main(inputs, keyspace, table):
    files = ['S&PSPX20{}.csv'.format(i) for i in range(12, 21)]
    spx_rawdata = [spark.read.csv("file:///{}/SPX_RawData/{}".format(inputs, fname),
                                  header=True, inferSchema=True)
                   for fname in files]
    spx_rawdata = reduce(lambda x, y: x.union(y), spx_rawdata)
    spx_rawdata = spx_rawdata.distinct()
    keys = ['Open', 'High', 'Low', 'Close']
    for key in keys:
        spx_rawdata = spx_rawdata.withColumn(key, functions.regexp_replace(key, ',', ''))
    for key in keys:
        spx_rawdata = spx_rawdata.withColumn(key, spx_rawdata[key].cast('double'))
    spx_rawdata.write.format("org.apache.spark.sql.cassandra") \
                     .options(table=table, keyspace=keyspace) \
                     .mode('append') \
                     .save()


if __name__ == '__main__':
    inputs = sys.argv[1]
    keyspace = sys.argv[2]
    table = sys.argv[3]
    cluster_seeds = ['node1.local', 'node2.local']
    spark = SparkSession.builder.appName('SPX raw data etl') \
                                .config('spark.cassandra.connection.host',
                                        ','.join(cluster_seeds)) \
                                .getOrCreate()
    assert spark.version >= '3.0'  # make sure we have Spark 3.0+
    spark.sparkContext.setLogLevel('WARN')
    sc = spark.sparkContext
    main(inputs, keyspace, table)
