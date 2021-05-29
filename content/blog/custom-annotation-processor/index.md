---
title: Custom Annotation Processor
date: "2021-05-11T11:12:22"
featuredImage: "./featured.jpg"
---
[code-github]: https://github.com/kkdrz/blog-examples/tree/main/annotation-processing
[java.lang.annotation]: https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/annotation/package-summary.html
[abstract-processor-docs]: https://docs.oracle.com/en/java/javase/11/docs/api/java.compiler/javax/annotation/processing/AbstractProcessor.html
[element-api]: https://docs.oracle.com/en/java/javase/11/docs/api/java.compiler/javax/lang/model/element/package-summary.html

Have you ever written code that you felt could be generated without any problems?
It happened to me many times. That's why I decided to share my experience with you :)

In this post I will show you **how to create some custom annotations and generate code based on them**.
If you want to go straight to the code, you can find it [on my GitHub][code-github].

# When to use?

Although code generation is enjoyable (at least for me) be careful not to overdo it.
Sometimes it is a short fragment that is not worth automating.
The decision as to whether to automate or generate something can be made on the basis of the following questions:

**1. Will it take me less time to automate it than to do it X times?**

I don't think it needs explaining. You may ask: *but what is X? Is it 3, 5, 10?*
There is no single correct answer. You have to guess (or maybe you know) how many times in the future you will have to repeat this task. 
Sometimes it's hard to estimate it, in that case I use 3.

**2. Is the procedure always the same and only the inputs change?**

This is a very strong premise for automating code. 
Even if you assume that you may not have to repeat the procedure in the future, you usually have to. 
And then you thank yourself for automating something in time.

**3. Is the result of this procedure dependent on another part of the code and may result in inconsistencies in the project if not done?**

It often happens that some parts of the code depend on each other. 
So whenever you modify the A code, you have to modify the B code and failing to do so 
will result in inconsistency that can be difficult to debug.
An example could be older servers that do not support annotations and need XML descriptors for Java code.

# Example

I will show an example based on a problem that occurred recently in my project at work.
Suppose we have a service that accepts some messages:

```java
package pl.kdrozd.examples.annotationprocessor;

public abstract class DeployableService {

    /**
     * Method automatically called by the server
     * on each message received.
     *
     * @param message received message
     */
    public void onMessage(Message message) {
        // process the message
    }

    /**
     * Allows to store user id in one session
     * The implementation is resolved by the server,
     * but you need to inform it about the userId property
     * via XML descriptor.
     *
     * @param id user id
     */
    public abstract void setUserId(String id);

    /**
     * Allows to retrieve user id set by {@link DeployableService#setUserId(String)}.
     *
     * @return user id or null if not set
     */
    public abstract String getUserId();

}
```

The `onMessage` method is triggered on each new message, 
but you may need to save some data from first message 
and access it when next message arrives.
The server that we use allows that via abstract methods.
You just need to create abstract setter, getter and register the field in the descriptor.
Actually, the whole `DeployableService` needs to be registered in the descriptor so that the server knows about it.

This is what the descriptor may look like:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<deployable-unit>

    <handler>
        <class>pl.kdrozd.examples.annotation.DeployableService</class>
        <session-fields>
            <field>userId</field>
        </session-fields>
    </handler>


</deployable-unit>
```

This example is short and greatly simplified, but when you create many handlers 
and applications the descriptor becomes huge and hard to maintain.
Therefore it is a good idea to automate the generation of such code.
Besides, I prefer to have these things in one place. 
Thanks to this, I can immediately see that I forgot to register a field 
instead of wasting time on unsuccesfull build, deploy and debugging.

So I wish I had something like this:

```java
package pl.kdrozd.examples.annotationprocessor;

@Handler
public abstract class DeployableService {
    
    public void onMessage(Message message) {
        // process the message
    }
    
    @SessionField
    public abstract void setUserId(String id);
    
    public abstract String getUserId();

}
```

*We could also generate `setUserId` and `getUserId`, but let's keep it simple.*

As you can see, there are two new self-explaining annotations: `@Handler` and `@SessionField`.
Based on this class, we can easily generate the descriptor.

## Annotation processing module

Let's create a new separate Gradle module (`annotation-processor`) so that we can reuse 
the annotation processor in other projects as well.
Its integration with our application will also be easier.

### Annotations 

Defining a custom annotation is very simple and looks like this:

```java
package pl.kdrozd.examples.annotationprocessor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.TYPE)
public @interface Handler {
}
```

```java
package pl.kdrozd.examples.annotationprocessor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.METHOD)
public @interface SessionField {
}
```

`@interface` tells Java that it is an annotation.

`@Retention` indicates how long annotations with the annotated type are to be retained. 
In other words, at what stage do you need them.

|  |  |
|-----------|-------------|
| `SOURCE`    | Discarded by compiler. Not needed after compilation completed. Not written to the bytecode.|
| `CLASS`     | Discarded by class loader. It is recorded in the `.class` file, but not available in a runtime.|
| `RUNTIME`   | Not discarded at all. Available at runtime (available for reflection).|

`@Target` - indicates the contexts in which an annotation type is applicable. 
Allows to define what can be annotated with this annotation: `CONSTRUCTOR`, `METHOD`, `FIELD`...?

More on that [in the javadoc][java.lang.annotation] :)

### Annotation processor

To use the annotations, we need to create a piece of code to process them. 
It is as simple as extending [`AbstractProcessor`][abstract-processor-docs] class.

```java 
package pl.kdrozd.examples.annotationprocessor;

import com.google.auto.service.AutoService;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.TypeElement;
import java.util.Set;

@SupportedAnnotationTypes({
        "pl.kdrozd.examples.annotationprocessor.Handler",
        "pl.kdrozd.examples.annotationprocessor.SessionField"
})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
public class DescriptorProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> set, RoundEnvironment roundEnvironment) {
        return false;
    }
}

```

`@SupportedAnnotationTypes` - defines which annotations are supported by this processor

`@SupportedSourceVersion` - sets supported JDK version

In the `process` method implement a code that handles the annotations.
Remember that everything in `process` happens before your code is compiled.
Therefore we do not use reflection here. Instead we have analogous [`Element` API][element-api]
for reflection-style inspection of the input source.

The processing code for my annotations looks like this:

```java
@Override
public boolean process(Set<? extends TypeElement> set, RoundEnvironment roundEnvironment) {
    Set<? extends Element> annotatedHandlers = roundEnvironment.getElementsAnnotatedWith(Handler.class);

    String handlersXml = annotatedHandlers.stream()
            .map(this::generateHandlerXml)
            .collect(Collectors.joining());

    StringBuilder finalDescriptor = new StringBuilder()
            .append("<?xml version=\"1.0\" encoding=\"utf-8\" ?>")
            .append("\n<deployable-unit>\n")
            .append(handlersXml)
            .append("\n</deployable-unit>\n");

    try {
        FileObject file = processingEnv.getFiler().createResource(StandardLocation.SOURCE_OUTPUT, "resources", "descriptor.xml");
        Writer writer = file.openWriter();
        writer.write(finalDescriptor.toString());
        writer.close();
    } catch (Exception ex) {
        ex.printStackTrace();
    }

    return false;
}

private String generateHandlerXml(Element handler) {
    String handlerPackage = ((PackageElement) handler.getEnclosingElement()).getQualifiedName().toString();
    String fullHandlerClassName = handlerPackage + "." + handler.getSimpleName().toString();
    StringBuilder handlerXml = new StringBuilder();

    handlerXml.append("\n\t<handler>")
            .append("\n\t\t<class>").append(fullHandlerClassName).append("</class>")
            .append("\n\t\t<session-fields>");

    // append fields
    handler.getEnclosedElements().stream()
            .filter(element -> element.getAnnotation(SessionField.class) != null)
            .map(this::getFieldName)
            .forEach(fieldName ->
                    handlerXml.append("\n\t\t\t<field>").append(fieldName).append("</field>")
            );

    handlerXml.append("\n\t\t</session-fields>")
            .append("\n\t</handler>\n");

    return handlerXml.toString();
}

private String getFieldName(Element element) {
    String methodName = element.getSimpleName().toString(); // setMyField
    String fieldName = methodName.substring(3); // remove 'set' = MyField
    return Character.toLowerCase(fieldName.charAt(0)) + fieldName.substring(1); //lowercase first letter = myField
}
```

Of course it could be improved by using some templating engine (like [Velocity](https://velocity.apache.org/)),
but for the purposes of this example, that is enough. 
I will not explain line by line what is happening in this method. 

Briefly:

1. I find all elements annotated with `@Handler`.
2. For each such element (class) I am looking for enclosed elements (setters) with `@SessionField` annotation.
3. Based on the elements found, I glue them in the XML format
4. I am saving the XML to a file `descriptor.xml`

The last thing you need to do is **register the processor**. 
This can be done in two ways:

**Classic approach**

Create `src/resources/META-INF/services/javax.annotation.processing.Processor` file.
In this file write path to your annotation processor class. 
If you want to register more processors write multiple paths, each in a new line.
In my case the content is:

```
pl.kdrozd.examples.annotationprocessor.DescriptorProcessor
```

**3rd party approach**

Add `com.google.auto.service.dependency.auto-service` dependency.

```gradle
annotationProcessor group: 'com.google.auto.service', name: 'auto-service', version: '1.0'
compile group: 'com.google.auto.service', name: 'auto-service', version: '1.0'
```

Annotate your annotation processor class with `@AutoService(Processor.class)`

```java
//...
import com.google.auto.service.AutoService;

@SupportedAnnotationTypes({
        "pl.kdrozd.examples.annotationprocessor.Handler",
        "pl.kdrozd.examples.annotationprocessor.SessionField"
})
@SupportedSourceVersion(SourceVersion.RELEASE_11)
@AutoService(Processor.class)
public class DescriptorProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> set, RoundEnvironment roundEnvironment) {

//...
```

It will automatically generate the file that has to be created in the 'classic approach'.
It works very similar to the processor we just created :)

And that's it, our annotation processor module is ready. Let's use it.

## Use the annotation processing module

In a separate module (`my-random-application`) there is our application in which we want to use a freshly created processor module (`annotation-processor`).
To do this, just add a dependency in a `build.gradle` file:

```gradle
dependencies {
    annotationProcessor project(":annotation-processor")
    implementation project(":annotation-processor")
//...
}
```

Done. Now, all you need to do is rebuild the application with `gradle clean build` 
and the descriptor should be generated to:
```
build/generated/sources/annotationProcessor/java/main/resources/descriptor.xml
```

If you want to use this processor module also in other projects, 
all you have to do is publish it to artifactory 
and change the dependency declaration (similarly how we declared `auto-service` above).