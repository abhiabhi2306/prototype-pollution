# Prototype Pollution [Research  + Hands On Lab]


In prototype based languages like javascript, upon creation of new objects they do carry over the properties and methods of prototype ``object``.

Prototype-based programming is a style of object-oriented programming in which behaviour reuse is performed via a process of reusing existing objects that serve as prototypes.

Basic attributes of object are:

→ toString

→ constructor

→ hasOwnProperty

Magical Attributes which can be used to overwrite/pollute are:

→ proto

→ constructor

→ prototype

One of the major highlights of javascript is the ability to do object based inheritance, this is a nice feature for modern web developers but at the same time it makes it more malicious.

The objects can be accessed through the _proto_ property of the javascript object, we don't need to directly modify it.

 #### **Impact**

The impact entirely depends on the application logic, we can change value of properties of certain objects which can interfere with the logic of the application, this can mainly lead to

- Business Logical Bugs
- Escalation of Privileges [Horizontal/Vertical]
- Remote Code Execution

#### **Bug Chain**

Prototype pollution can be chained with various other vulnerabilities in-order to increase the severity/impact.

*One notable examples*

***AST Injection, Prototype Pollution to RCE  - This is a chain of prototype pollution + AST Injection triggering a remote code execution (***[https://blog.p6.is/AST-Injection/](https://blog.p6.is/AST-Injection/)) - It is a nice research by POSIX where 

we can make influence to the compilation process using prototype pollution.

You can insert any string into `Object.prototype.pendingContent` to determine the possibility of an attack hence triggering an RCE.

#### Mitigation

1) Object.freeze() method could freeze an object so that the object cannot be modified any longer.

2) Prototypeless objects can be created using Object.create(null), using them makes it impossible to pollute as they won't have the necessary magic attributes like *proto*, constructor etc.

![https://i.postimg.cc/prPj9QDS/proto-type-fix.png](https://i.postimg.cc/prPj9QDS/proto-type-fix.png)

3) In case you are using functions like merge, make sure you avoid unsafe recursive merge, validate the data before passing it into the function.

#### **Practice Lab**

I've made a sample lab where you can practice polluting the prototype in-order to escalate privilege from normal user to admin, and then gain command execution.

The dockerfile can be found here → ( https://github.com/abhiabhi2306/prototype-pollution/tree/main/lab)

This will give you a nice practical understanding of how it works.


#### References & Reports

1) Prototype Pollution in Hackerone [[https://portswigger.net/daily-swig/prototype-pollution-vulnerability-left-bug-bounty-platform-hackerone-open-to-attack](https://portswigger.net/daily-swig/prototype-pollution-vulnerability-left-bug-bounty-platform-hackerone-open-to-attack)]

2) Nested-Property Prototype Pollution - HackerOne [[https://hackerone.com/reports/788883](https://hackerone.com/reports/788883)]

3) Prototype Pollution in Loadash Package - HackerOne [[https://hackerone.com/reports/380873](https://hackerone.com/reports/380873)]

4) Lodash Prototype Pollution Vulnerability - Huntr [[https://www.huntr.dev/blog/lodash-understanding-the-vulnerability-and-how-we-can-rally-behind-packages](https://www.huntr.dev/blog/lodash-understanding-the-vulnerability-and-how-we-can-rally-behind-packages)]

