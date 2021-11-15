class HashMap:
    """HashMap class"""
    def __init__(self) -> None:
        """init function"""
        self.dict = []
        self.cap = 7
        self.syze = 0

    def get(key):
        """Return the value for key if key is in the dictionary. If key is not in the
dictionary, raise a KeyError."""
        pass

    def set(self, key, value):
        """add the (key,value) pair to the hashMap. After adding, if the load-
factor >= 80%, rehash the map into a map double its current capacity. For this project
rehash when the load factor is >= 80%. new k = 2k-1.  """
        if key in self.dict:
            return
        elif self.syze > (.8 * self.cap):
            self.cap *= 2
        else:
            # add key to dictionary
            hash = key % self.cap
            self.dict[hash] = tuple(key,value)

    def remove(key):
        """Remove the key and its associated value from the map. If the key
does not exist, nothing happens. Do not rehash the table after deleting keys. """
        pass

    def clear(self):
        """empty the HashMap """
        self.dict = []
        self.cap = 7

    def capacity(self):
        """Return the current capacity--number of buckets--in the map. """
        return self.cap

    def size(self):
        """Return the number of key-value pairs in the map. """
        return self.syze

    def keys():
        """Return a list of keys. """
        pass
 