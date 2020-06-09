# JavaScript-oblig-3

Introduction

The goal of the assignment is to test whether you have advanced your skills so that we can proceed with more complex Javascript programming assignments. This includes:

making and updating a plan for a computer program 
reading from text files
writing and executing  functions 
storing data, reading and manipulating strings and arrays
calculating basic statistics
dynamically presenting information
You will see that we have included one bonus task and a number of bonus sub tasks. These are not mandatory but will provide you with considerable  experience. You should at least give them a try.

# General Description

In this assignment your task is to read data from a CSV (Comma Separated Value) text file and display the file contents as well as global statistics about the data on a web page. You will be provided with the CSV file. Each line in the CSV file is a record of an expense transaction. It has  information about the date, location, type, and amount. The task is to read the file and present each transaction as well as statistics about the transactions on a web page.  We  explicitly ask you to devise a plan before you begin coding about how your program will achieve the task, update it as you program, and submit both the original as well as the final plan together with your code.

More specifically, you have to perform the following tasks:

 

## Task 1 - Planning

In this task, you are asked to create a plan about how your program will work. You do not need to provide every detail but rather a general overview of high-level functionality. If you d like you can draw a diagram. You are welcome to use the tasks below as a guidance. We want you to try to define what sub goals need to be achieved by your program in order to accomplish the desired functionality and in which order do you need to perform the operations required to reach each sub goal. We also want you to describe what information needs to be stored internally in your program so that sub goals can be achieved and what variables will you use for this purpose.  We also want you to define what functions are you going to write, what functionality will they  implement, what  parameters they take, and  the return value (if any). You need to justify your choices shortly.

## Task 2 - Read from File

In this task, you will need to read from a CSV file and store all transactions in computer memory as a string.

## Task 3 - Store

In this task, you need to think carefully about how are you going to data read from the file and how you will store them in computer memory. For example, it is possible to store data as a 2D array. Each row will have a separate transaction and each column the information associated with each transaction. Another approach is to use an array of objects. Then you can use an one-dimensional array in which each cell will contain a transaction object with the associated information fields (location, amount, type, date) stored as object properties.  Think about the pros and cons of each approach. 

## Task 4 - Calculate Global Statistics

In this task, you need to calculate appropriate statistics:

the total number of transaction locations
the total number of transaction types
the total, average amount, maximum, and minimum amount for all transactions (irrespective of physical location or transaction type)
the total duration of the observation period
 Bonus: Extend Task 4.3 to calculate amounts for each physical location and each transaction type

## Task 5 - Present Transactions 

In this task, you will need to present all transactions in the file to the user. It is recommended that you use  an HTML table for presentation in which each row corresponds to each transaction and each column to the columns in the CSV data file. An additional column with a serial number for each transaction should be included.  A properly formatted  presentation in the console will also be accepted (for students you have not taken the Web Design course only) 

## Task 6 - Present Statistics

In this task, you need to present the global statistics calculated in Task 4 in a second HTML table (or console but only if you are not taking the Web Design course) 

 Bonus: Extend the presentation to present amounts for each physical location and each transaction type as well as for all locations and transaction types. 

## Task 7 - Update Plan

Update the plan you have produced in Task 1 to reflect the way your program operates now. Write a short essay to explaining what is different now and why.

## Task 8 - Advance Plan

Assume now that your program needs to present statistics in a dynamic way. This means that users should be able to specify a given time period, transaction, type, or location and see only  the relevant transactions and statistics. Your task is to sketch how your original program would have to be changed in order to provide this functionality. Would you need to change the way you store your data, the way you designed your  functions, or the way you present the results and how? What other changes are necessary?

## BONUS: Task 8

Implement the changes you propose in Task 8. Your new program should accept as input the transaction type, transaction location, and transaction period and update the transaction and statistics table to reflect the results of your query.  

NB, this task is not mandatory. It is, however, a great exercise in programming and we encourage you to try it out.
