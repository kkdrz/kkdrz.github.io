---
title: How To Perform a Partial Update (Patch) With Explicit Null Values?
date: "2021-02-07T23:46:37.121Z"
excerpt: In this article, I will show you, how to perform a partial update with explicit null values using JsonNullable and mapstruct.
featuredImage: "./featured.jpg"
---
[JsonNullable]: https://github.com/OpenAPITools/jackson-databind-nullable
[mapstruct]: https://mapstruct.org/
[repository]: https://github.com/kkdrz/blog-examples/tree/main/jsonnullable-with-mapstruct
[RFC 5789]: https://tools.ietf.org/html/rfc5789
[RFC 7231 4.3.4]: https://tools.ietf.org/html/rfc7231#section-4.3.4
[JSON Merge Patch (RFC 7386)]: https://tools.ietf.org/html/rfc7386
[OpenAPITools]: https://github.com/OpenAPITools
[modelmapper]: http://modelmapper.org/

## Overview

In this article, I will show you, how to perform a partial update with explicit `null` values using [JsonNullable] and [mapstruct]. 
The example is available on [Github][repository]. 
Below, only the necessary code snippets are presented.

## The Idea of Partial Updates

The appropriate HTTP verb for this task is PATCH ([RFC 5789]). The difference between PATCH and PUT ([RFC 7231 4.3.4]) is that PUT method allows only a complete replacement of an entity and with PATCH you can perform [JSON Merge Patch (RFC 7386)].

```shell
test fff
```

So, given the entity:

```java
public class Product {

    private Long id;
    private String name;
    private Integer quantity;
    private String description;
    private String manufacturer;

// getters, setters, constructors...
}
```

we can update only the `description` field with:

```json
// PATCH http://kdrozd.pl/api/product/3
// Body:
{
  "description": "Some description of product "
}
```

Other fields are not present, so they will be evaluated to `null` and ignored. 

But, what if we want to update the `description` with `null`? It is not possible, because there is no way to distinguish the missing field (evaluated to `null`) from the field with value set explicitly to `null`. String class has only two states available:

  * value is present and is not `null`, e.g. `''`, `'something'`, `'123'`
  * value is not present -> `null`

`{ "description": null }` is interpreted the same as `{ }`. 
In both cases the `description` field will not be updated.

If you still don't fully understand what I mean, check this out: [JSON Merge Patch (RFC 7386)].

Some may try to use cruelly dirty workarounds. 
For example, in the case of `String`, you can interpret `'null'` as a command: update with a real `null`. 
But what in case of `Integer`? `0` would be your `null`? How about `Boolean`? 
**Do not do that!**

The correct way is to use a wrapper, for example in the form of a [JsonNullable] class. So instead of `String description` we get `JsonNullable<String> description`. Additionally, to avoid writing a lot of mapping code (because you need an additional layer of DTOs), you can combine it with a mapper, e.g. [mapstruct].

## How to Implement Partial Update With JsonNullable and MapStruct?

### Why JsonNullable?

I chose this library because it is simple and made exactly for this purpose. Some people use `Optional` and it will work, but it's not made for that purpose. On this point, I agree with the makers of [JsonNullable]:


>A lot of people use Optional to bring this behaviour. Although it kinda works, it's not a good idea because:
>
>1. Beans shouldn't have Optional fields. Optional was designed to be used only as method return value.
>2. Optional should never be null. The goal of Optional is to wrap the null and prevent NPE so the code should be designed to never assign null to an Optional. A code invoking a method returning an Optional should be confident that this Optional is not null. 
>
>~ [OpenAPITools]/[jackson-databind-nullable][JsonNullable]


### Why mapstruct?

  * It is very flexible, and even if it doesn't do something automatically, there is no problem integrating some customization in the mapping process. 
  * `mapstruct` is a compile-time code generator. It means that the mapper class is generated before starting the application (just as if the mapper was hand-written). This makes debugging a lot easier as the code is very easy to understand. 
  * Due to the fact that it does not work in runtime, it is much faster than other libraries, because it does not use any complicated mechanisms (e.g. reflection)

I have once used a [modelmapper] library that works in a runtime. It was incredibly difficult to find the cause of the mapper's malfunction. I had to delve into the complicated mechanisms of the library, even though I didn't need any sophisticated customizations. Luckily I found out about [mapstruct] library and migration took me less time than debugging [modelmapper].

### Configuration

For all this to work we need to configure some dependencies. I used `Maven` but everything should work fine with `Gradle` as well. Here are the changes in the `pom.xml`:

```xml
<dependencies>

    <!-- other dependencies omitted (spring, h2, tests...) -->

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-json</artifactId>
    </dependency>

    <dependency>
        <groupId>org.openapitools</groupId>
        <artifactId>jackson-databind-nullable</artifactId>
        <version>0.2.1</version>
    </dependency>

    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>1.4.1.Final</version>
    </dependency>

</dependencies>

<build>
    <plugins>

        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>

        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>11</source>
                <target>11</target>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.mapstruct</groupId>
                        <artifactId>mapstruct-processor</artifactId>
                        <version>1.4.1.Final</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>

    </plugins>
</build>
```

Additionally to inform `Jackson` how to handle `JsonNullable`, we have to register an additional module:

```java
import com.fasterxml.jackson.annotation.JsonInclude;
import org.openapitools.jackson.nullable.JsonNullableModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class JacksonConfig {

    @Bean
    Jackson2ObjectMapperBuilder objectMapperBuilder() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        builder.serializationInclusion(JsonInclude.Include.ALWAYS)
                .modulesToInstall(new JsonNullableModule());
        return builder;
    }

}
```

The example is based on an entity named `Product`. For simplicity, the `ProductDTO` class has exactly the same fields. The only difference is that some fields are wrapped in a `JsonNullable<>` type to be able to perform [JSON Merge Patch (RFC 7386)] on them.

```java
package pl.kdrozd.examples.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Integer quantity;
    private String description;
    private String manufacturer;

    // constructors, getters, setters...
```

```java
package pl.kdrozd.examples.dto;

import org.openapitools.jackson.nullable.JsonNullable;

import java.util.Objects;

public class ProductDTO {

    private Long id;
    private String name;
    private Integer quantity;
    private JsonNullable<String> description;
    private JsonNullable<String> manufacturer;

    // constructor, getters, setters...
```

Let's see if Jackson deserializes our entity correctly:

```java
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pl.kdrozd.examples.dto.ProductDTO;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@SpringBootTest
class JacksonConfigTest {

    @Autowired
    private ObjectMapper mapper;

    @Test
    void should_use_json_nullable_module() throws JsonProcessingException {
        assertEquals(JsonNullable.of("some description"), mapper.readValue("{\"description\":\"some description\"}", ProductDTO.class).getDescription());
        assertEquals(JsonNullable.of(null), mapper.readValue("{\"description\":null}", ProductDTO.class).getDescription());
        assertNull(mapper.readValue("{}", ProductDTO.class).getDescription());
    }
}
```

### Mapping DTO and Model classes

Instead of rewriting fields between the model and DTO manually, we will use the [mapstruct] library. 
In our case this is all you would need if we didn't use `JsonNullable`:

```java
package pl.kdrozd.examples.mapper;

import org.mapstruct.*;
import pl.kdrozd.examples.dto.ProductDTO;
import pl.kdrozd.examples.model.Product;

@Mapper(componentModel = "spring", 
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductMapper {

    Product map(ProductDTO entity);

    ProductDTO map(Product entity);

    @InheritConfiguration
    @Mapping(target = "id", ignore = true)
    void update(ProductDTO update, @MappingTarget Product destination);

}
```

Unfortunately, `mapstruct` has no built-in support for the `JsonNullable` class and when trying to compile the project we will get the error:

```
java: Can't map property "JsonNullable<string> description" to "String description". Consider to declare/implement a mapping method: "String map(JsonNullable<string> value)".
```

Maybe my solution is not the best and has its drawbacks, but it works and that's the most important thing for me. To get rid of this error, we need to define a separate mapper for the `JsonNullable` class and mark each field that should use it. So we get:

```java
package pl.kdrozd.examples.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.openapitools.jackson.nullable.JsonNullable;

@Mapper(componentModel = "spring")
public interface JsonNullableMapper {

    @Named("unwrap")
    default String unwrap(JsonNullable<String> nullable) {
        return nullable.orElse(null);
    }

    @Named("wrap")
    default JsonNullable<String> wrap(String entity) {
        return JsonNullable.of(entity);
    }

}
```

```java
package pl.kdrozd.examples.mapper;

import org.mapstruct.*;
import pl.kdrozd.examples.dto.ProductDTO;
import pl.kdrozd.examples.model.Product;

@Mapper(uses = JsonNullableMapper.class, 
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, 
        componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "description", target = "description", qualifiedByName = "unwrap")
    @Mapping(source = "manufacturer", target = "manufacturer", qualifiedByName = "unwrap")
    Product map(ProductDTO entity);

    @Mapping(source = "description", target = "description", qualifiedByName = "wrap")
    @Mapping(source = "manufacturer", target = "manufacturer", qualifiedByName = "wrap")
    ProductDTO map(Product entity);

    @InheritConfiguration
    @Mapping(target = "id", ignore = true) // we do not allow updating 'id'
    void update(ProductDTO update, @MappingTarget Product destination);

}
```

Now the project should compile and mappers sources are generated into `target\generated-sources\annotations` directory.

```java
package pl.kdrozd.examples.mapper;

import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.kdrozd.examples.dto.ProductDTO;
import pl.kdrozd.examples.model.Product;

// generated by mapstruct
@Component
public class ProductMapperImpl implements ProductMapper {

    @Autowired
    private JsonNullableMapper jsonNullableMapper;

    @Override
    public Product map(ProductDTO entity) {
        if ( entity == null ) {
            return null;
        }

        String description = null;
        String manufacturer = null;
        Long id = null;
        String name = null;
        Integer quantity = null;

        description = jsonNullableMapper.unwrap( entity.getDescription() );
        manufacturer = jsonNullableMapper.unwrap( entity.getManufacturer() );
        id = entity.getId();
        name = entity.getName();
        quantity = entity.getQuantity();

        Product product = new Product( id, name, quantity, description, manufacturer );

        return product;
    }

    @Override
    public ProductDTO map(Product entity) {
        if ( entity == null ) {
            return null;
        }

        JsonNullable<String> description = null;
        JsonNullable<String> manufacturer = null;
        long id = 0L;
        String name = null;
        Integer quantity = null;

        description = jsonNullableMapper.wrap( entity.getDescription() );
        manufacturer = jsonNullableMapper.wrap( entity.getManufacturer() );
        if ( entity.getId() != null ) {
            id = entity.getId();
        }
        name = entity.getName();
        quantity = entity.getQuantity();

        ProductDTO productDTO = new ProductDTO( id, name, quantity, description, manufacturer );

        return productDTO;
    }

    @Override
    public void update(ProductDTO update, Product destination) {
        if ( update == null ) {
            return;
        }

        if ( update.getDescription() != null ) {
            destination.setDescription( jsonNullableMapper.unwrap( update.getDescription() ) );
        }
        if ( update.getManufacturer() != null ) {
            destination.setManufacturer( jsonNullableMapper.unwrap( update.getManufacturer() ) );
        }
        if ( update.getId() != null ) {
            destination.setId( update.getId() );
        }
        if ( update.getName() != null ) {
            destination.setName( update.getName() );
        }
        if ( update.getQuantity() != null ) {
            destination.setQuantity( update.getQuantity() );
        }
    }
}
```

Let's create some tests to check if `mapper.update(...)` works as expected:

  1. When all fields are present, should update all of them, except `id`.
  2. When explicit `null` is passed to the nullable field (`JsonNullable.of(null)`), it should update the field with `null`
  3. When the field is `null` and is not wrapped with `JsonNullable`, should not update the field
  4. When the nullable field is not present (`JsonNullable.undefined()`) should not update the field.

```java
@Test // 1 - success
void should_update_all_entities_in_product_except_id() {
    ProductDTO update = new ProductDTO(3L, "Updated name", 2, JsonNullable.of("Updated description"), JsonNullable.of("UpdateCompany"));
    Product destination = new Product(1L, "RTX3080", 0, "Great GPU", "NVIDIA");
    Product expected = new Product(1L, "Updated name", 2, "Updated description", "UpdateCompany");
    mapper.update(update, destination);
    assertEquals(expected.getId(), destination.getId());
    assertEquals(expected.getDescription(), destination.getDescription());
    assertEquals(expected.getManufacturer(), destination.getManufacturer());
    assertEquals(expected.getName(), destination.getName());
    assertEquals(expected.getQuantity(), destination.getQuantity());
}

@Test // 2 - success
void should_update_only_nullable_fields_in_product() {
    ProductDTO update = new ProductDTO(1L, null, null, JsonNullable.of(null), JsonNullable.of(null));
    Product destination = new Product(1L, "RTX3080", 0, "Great GPU", "NVIDIA");
    Product expected = new Product(1L, "RTX3080", 0, null, null);
    mapper.update(update, destination);
    assertEquals(expected.getId(), destination.getId());
    assertEquals(expected.getDescription(), destination.getDescription());
    assertEquals(expected.getManufacturer(), destination.getManufacturer());
    assertEquals(expected.getName(), destination.getName());
    assertEquals(expected.getQuantity(), destination.getQuantity());
}

@Test // 3 - success
void should_not_update_any_field_in_product_2() {
    ProductDTO update = new ProductDTO(null, null, null, null, null);
    Product destination = new Product(1L, "RTX3080", 0, "Great GPU", "NVIDIA");
    Product expected = new Product(1L, "RTX3080", 0, "Great GPU", "NVIDIA");
    mapper.update(update, destination);
    assertEquals(expected.getId(), destination.getId());
    assertEquals(expected.getDescription(), destination.getDescription());
    assertEquals(expected.getManufacturer(), destination.getManufacturer());
    assertEquals(expected.getName(), destination.getName());
    assertEquals(expected.getQuantity(), destination.getQuantity());
}

@Test // 4 - failure
void should_not_update_any_field_in_product() {
    ProductDTO update = new ProductDTO(null, null, null, JsonNullable.undefined(), JsonNullable.undefined());
    Product destination = new Product(1L, "RTX3080", 0, "Great GPU", "NVIDIA");
    Product expected = new Product(1L, "RTX3080", 0, "Great GPU", "NVIDIA");
    mapper.update(update, destination);
    assertEquals(expected.getId(), destination.getId()); // org.opentest4j.AssertionFailedError: Expected:"Great GPU" Actual:null
    assertEquals(expected.getDescription(), destination.getDescription());
    assertEquals(expected.getManufacturer(), destination.getManufacturer());
    assertEquals(expected.getName(), destination.getName());
    assertEquals(expected.getQuantity(), destination.getQuantity());
}
```

All of our tests work except test number 4. It looks like our mapper does not handle `JsonNullable.undefined()` properly. The problem is that mapper assumed that if the field is not `null` it should update it. In our case `JsonNullable.undefined()` is not `null` indeed, but it also has no value present, so it evaluates to `null` anyway. In the case of the `JsonNullable` field, mapper should check whether the value `isPresent()`.

So instead of:

```java
if ( update.getDescription() != null ) {
    destination.setDescription( jsonNullableMapper.unwrap( update.getDescription() ) );
}
```

we want:

```java
if ( update.getDescription() != null && update.getDescription().isPresent()) {
    destination.setDescription( jsonNullableMapper.unwrap( update.getDescription() ) );
}
```

Fortunately, `mapstruct` can do this very easily. If it detects that there is a method with a signature: `boolean has<fieldName>()` for the field it maps, it will use this method instead of a `null` check. So we need to add those methods for each `JsonNullable` field in `ProductDTO`:

```java
package pl.kdrozd.examples.dto;

import org.openapitools.jackson.nullable.JsonNullable;

import java.util.Objects;

public class ProductDTO {

    private Long id;
    private String name;
    private Integer quantity;
    private JsonNullable<String> description;
    private JsonNullable<String> manufacturer;

    public boolean hasDescription() {
        return description != null && description.isPresent();
    }
    
    public boolean hasManufacturer() {
        return manufacturer != null && manufacturer.isPresent();
    }
```

`Mapstruct` generated exactly what we need and now the 4th test passes.

```java
@Override //generated by mapstruct
public void update(ProductDTO update, Product destination) {
    if ( update == null ) {
        return;
    }

    if ( update.hasDescription() ) {
         destination.setDescription( jsonNullableMapper.unwrap( update.getDescription() ) );
    }
    if ( update.hasManufacturer() ) {
        destination.setManufacturer( jsonNullableMapper.unwrap( update.getManufacturer() ) );
    }
    if ( update.getName() != null ) {
        destination.setName( update.getName() );
    }
    if ( update.getQuantity() != null ) {
        destination.setQuantity( update.getQuantity() );
    }
}
```

## Summary

In this article, I have presented you how to implement a partial update with `JsonNullable` and `mapstruct`. The source code can be found on my [Github][repository].

This approach has a few drawbacks, but it's the best method I know so far. If you know better solutions, I will be happy to find out about them!