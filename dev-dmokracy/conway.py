# Python prototype for Conway's Game of Life

import ctypes
from copy import deepcopy
import sys
import time

# Creates an empty grid
def init_blank(height, width):
    grid = []
    for i in range(height):
        grid.append([])
        for j in range(width):
            grid[i].append(0)
    return grid

# Creates a small grid with a blinker for test purposes
def blinker():
    grid = init_blank(3, 3)
    for col in range(0, 3):
        grid[1][col] = 1
    return grid

# Read in a file describing a starting pattern
def load_pattern(filename):
    try:
        f = open(filename, 'r')
        height = int(f.readline())
        width = int(f.readline())
        # Add 1 to size to lazily account for the newline
        grid = init_blank(height, width + 1)
        for i in range(0, len(grid)):
            for j in range(0, len(grid[0])):
                if f.read(1) == 'O':
                    grid[i][j] = 1
    finally:
        f.close()
    return grid

# Prints out the grid
def print_grid(grid):
    for row in grid:
        for val in row:
            output = 'O' if val == 1 else '.'
            print('{}'.format(output), end=" ")
        print('')
    print('')

# Prints the grid and moves the cursor back to the beginning
# for updating the grid in-place
def print_grid_return(grid):
    print_grid(grid)
    for row in grid:
        sys.stdout.write('\u001b[1A')
    sys.stdout.write('\u001b[1A')

# Returns the next generation for a given grid
def update(grid):
    new_grid = deepcopy(grid)
    for i in range(0, len(grid)):
        for j in range(0, len(grid[0])):
            population = sum_neighbours(grid, i, j)
            if (population < 2 or population > 3):
                new_grid[i][j] = 0
            elif (population == 3):
                new_grid[i][j] = 1
    return new_grid

# Counts the number of neighbours for a given cell
def sum_neighbours(grid, i, j):
    n = int(not i == 0)
    s = int(not i == (len(grid) - 1))
    w = int(not j == 0)
    e = int(not j == (len(grid[0]) - 1))
    
    neighbours = [ grid[i-n][j-w], grid[i-n][j], grid[i-n][j+e], \
                   grid[i][j-w],                 grid[i][j+e], \
                   grid[i+s][j-w], grid[i+s][j], grid[i+s][j+e] ]

    # Cells beyond the edge of the grid are considered dead
    if not n:
        neighbours[0] = neighbours[1] = neighbours[2] = 0
    if not s:
        neighbours[5] = neighbours[6] = neighbours[7] = 0
    if not w:
        neighbours[0] = neighbours[3] = neighbours[5] = 0
    if not e:
        neighbours[2] = neighbours[4] = neighbours[7] = 0
    return sum(neighbours)

def main():
    # Set up the terminal to handle escape sequences
    kernel32 = ctypes.windll.kernel32
    kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)
    grid = load_pattern('pulsar.cells')
    # grid = blinker()
    for i in range(0, 10):
        print_grid_return(grid)
        time.sleep(1)
        grid = update(grid)
    print_grid(grid)

if __name__ == "__main__":
    main()
