#### 学习android过程中的java问题

+ 查看UI框架时遇到的Maven： Maven是基于项目对象模型(POM project object model)，可以通过一小段描述信息（配置）来管理项目的构建，报告和文档的软件项目管理工具
  + 什么是POM？
  POM是项目对象模型(Project Object Model)的简称,它是Maven项目中的文件，使用XML表示，名称叫做pom.xml。作用类似ant的build.xml文件，功能更强大。该文件用于管理：源代码、配置文件、开发者的信息和角色、问题追踪系统、组织信息、项目授权、项目的url、项目的依赖关系等等。事实上，在Maven世界中，project可以什么都没有，甚至没有代码，但是必须包含pom.xml文件。
  + android也可以使用maven构建应该是和gradle功能类似
  >>  在代码世界中有三大构建工具，ant、Maven和Gradle。现在的状况是maven和gradle并存，gradle使用的越来越广泛。Maven使用基于XML的配置，Gradle采用了领域特定语言Groovy的配置。