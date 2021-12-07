import sys
import math

class Graph:
    def __init__(self, vertices = [], edges = []) -> None:
        """Initializes the class"""
        self.weight = 0
        self.vertices = vertices
        self.edges = edges

    def add_vertex(self, label):
        """add a vertex with the specified label. Return the graph. label must be a string or raise ValueError"""
        if not isinstance(label, str):
            raise ValueError

        if label not in self.vertices:
            self.vertices.append(label)

        return self

    def add_edge(self, src, dest, w):
        """add an edge from vertex src to vertex dest with weight w. Return the graph. validate src, dest, and w: raise ValueError if not valid.""" 
        if not isinstance(src, str) or not isinstance(dest, str) or not (isinstance(w, int) or isinstance(w, float)) or not len(src) + len(dest) == 2:
            raise ValueError

        if (src, dest, w) not in self.edges:
            self.edges.append((src, dest, w))

        return self

    def get_weight(self, src, dest) -> float:
        """Return the weight on edge src-dest (math.inf if no path exists, raise ValueError if src or dest not added to graph)."""
        pass

    def dfs(self, starting_vertex):
        """Return a generator for traversing the graph in depth-first order starting from the specified vertex. 
        Raise a ValueError if the vertex does not exist."""
        
        visited = []

        stack = []
        stack.append(starting_vertex)
 
        while len(stack):
            s = stack.pop()
 
            if s not in visited:
                yield s
                visited.append(s)

            for node in self.edges:
                if node[0] == s and node[1] not in visited:
                    stack.append(node[1])      

    def bfs(self, starting_vertex):
        """Return a generator for traversing the graph in breadth-first order starting from the specified vertex. Raise a ValueError if the vertex does not exist."""
        visited = []
        queue = []
        
        if starting_vertex not in self.vertices:
            raise ValueError
        
        visited.append(starting_vertex)
        queue.append(starting_vertex)
        yield starting_vertex
        
        while queue:
            s = queue.pop(0)
            for x in self.edges:
                if x[0] == s and x[1] not in visited:
                    visited.append(x[1])
                    queue.append(x[1])
                    yield x[1]
        
    def dsp(self, src, dest) -> list:
        """Return a tuple (path length , the list of vertices on the path from dest back to src). If no path exists, return the tuple (math.inf,  empty list.)"""
        pass

    def dsp_all(self, src) -> dict:
        """Return a dictionary of the shortest weighted path between src and all other vertices using Dijkstra's Shortest Path algorithm. 
        In the dictionary, the key is the the destination vertex label, the value is a list of vertices on the path from src to dest inclusive."""
        dictionary = self.dijkstra(src)
        total_dist = 0
        path = [src]

        src = dictionary.get(src)[0]
        path.insert(0, src)

        while src:
            src = dictionary.get(src)[0]
            total_dist += dictionary.get(src)[1]
            path.insert(0, src)

        return {total_dist, path}

    def dijkstra(self, src) -> dict:
        to_visit = []
        visited = []
        dist = {}

        for vert in self.vertices:
            dist[vert] = [None, sys.maxsize]

        dist[src] = [src, 0]

        while(True):            
            for edge in self.edges:
                
                if edge[0] == src and edge not in visited:
                    to_visit.append(edge[1])
                    visited.append(edge)
                    distance = dist.get(src)[1] + edge[2]

                    if distance < dist.get(edge[1])[1]:
                        dist[edge[1]] = (src, distance)

            try:
                src = to_visit.pop(0)
            except IndexError:
                return dist

    def __str__(self):
        """Produce a string representation of the graph that can be used with print(). The format of the graph should be in GraphViz dot notation,"""
        pass

def main():
    g = Graph()
    g.add_vertex("A")
    g.add_vertex("B")
    g.add_vertex("C")
    g.add_vertex("D")
    g.add_vertex("E")
    g.add_vertex("F")

    g.add_edge("A", "B", 2)
    g.add_edge("A", "F", 9)

    g.add_edge("B", "F", 6)
    g.add_edge("B", "D", 15)
    g.add_edge("B", "C", 8)

    g.add_edge("C", "D", 1)

    g.add_edge("E", "C", 7)
    g.add_edge("E", "D", 3)

    g.add_edge("F", "B", 6)
    g.add_edge("F", "E", 3)

    paths = g.dsp_all("A")
    print(paths)
    
if __name__ == "__main__":
    main()