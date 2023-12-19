---
title: "The table naming dilemma: singular vs. plural"
date: 2017-01-25
translationKey: "blogTable"
excerpt: "Have you ever spent too much time reflecting on how you should name your tables? In this post I try to find a solution to this problem."
cover:
    author: "Eli Francis"
    link: "https://unsplash.com/@elifrancis"
---
The other day, while in a planning poker session, the question of the naming of a particular table arose. During that conversation, one of our developers suggested that the table shall have a singular name, while others questioned that idea and thought that every table names should be plural. This led me to ask this question: is there a better choice? *Should* table names be singular or plural?

It's funny to see that despite the fact that there is no clear convention regarding this topic, it is a question that gets asked pretty often, and it is the source of big debates in the DB world.

## Using plural names

Narayana "Vyas" Kondreddi (long-time DBA and SQL Engineer) wrote back in 2001:

> Tables represent the instances of an entity. For example, you store all your customer information in a table. Here, 'customer' is an entity and all the rows in the customers table represent the instances of the entity 'customer'. So, why not name your table using the entity it represents, 'Customer'. Since the table is storing 'multiple instances' of customers, make your table name a plural word.

It feels logical, and somewhat "natural". You store several customers inside a table (those "multiple instances"), so the table should naturally be named `customers`. It also makes sense when writing an SQL statement. When you want to go through all your customers, you `SELECT * FROM customers`...

When using plural name, one can consider a table like a crate containing several items. A crate of apples should be labelled *Apples*, whether it contains one or a hundred apples.

## Using singular names

The people that advocate the usage of singular names often cite the fact that when pointing at a database record, it feels confusing to use a plural name to describe a single item. Thus, why should you use `clients.name` when you're pointing only at one client?

This is enhanced when writing SQL statements, that suddenly appear more natural. For exemple, `SELECT activity.name` feels better than `SELECT activities.name`

It also avoids confusion of english pluralization which can sometimes be tricky for non-fluent writers. e.g. *activity* becomes *activities* while *person* becoms *people* and *data* remains *data*...

When using singular names, one can consider using the "set theory" to tables, meaning that any instance in the set is representative of the set, so `apple` is an Apple set. It is agnostic of how many apples are in the set.

## What should you use?

I personally do believe that a database table is the representation of a collection of items. As such, it should be named using a plural word, since it stores several copies of an entity. Thus, each `user` is stored inside the `users` table.

The only thing that could have made me consider using singular names is the SQL statement point, as it feels less natural to use a plural name for a query on a single item. If you're bugged out by that point you can still use this simple trick to circonvert that issue:

```SQL
SELECT id, name, description FROM products product WHERE product.name = 'foo' AND product.description = 'bar'
```

It's even more practical when dealing with more complex pluralization:

```SQL
SELECT id, name, description FROM activities activity WHERE activity.name = 'foo' AND activity.description = 'bar'
```

If you're really concerned about writing good looking code that feels like proper english, my advice is to use plural names for tables, but single names for the corresponding entities. As such, for e.g. in Symfony you'd declare an entity `Activity` as such:

```php
/**
 * @Activity
 *
 * @ORM\Table(name="activities")
 */
class Activity
{
...
}
```

The table `activities` stores all instances of the possible object `Activity`. Thus, when invocating and working with that object it makes sense to use the syntax `$activity = new Activity()` and `$activity->setName("foo")`.

## In short

If I had to give you one piece of advice though, it would be to this: **be consistent**. Stick to whatever convention you've decided, and apply it throughout your project. Use what feels the most natural to you and your team. Having the ability to rely on convention is often a good thing, but there are times when a convention is not needed. What's the most important is to make a clear choice and adopt it. Of course, it's also important to keep an open ear to the arguments people could provide that'd make you divert from that choice.

If you're still looking for some guidance, here are some other tips you might want to use when naming database tables:

- Use short names for your tables
- Use underscore to separate words (no spaces or camelCase), for e.g. `product_dimensions`
- Be somewhat descriptive: a table name should represent its content. It's easier to read `client_bills` rather than `clb`
- Use unique names that cannot collude with SQL/RDBMS reserved words (avoid `name`, `order`, `percent`...)
- Do not use the table name followd by "id" (e.g. `client_id`) as your PK. `id` is more than enough and everyone will understand
- Use `id` and not `ID`
- Actually, never use capital letters in your table or field names. Ever.

---

Sources:

- [http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names](http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names)
- [http://stackoverflow.com/questions/7899200/is-there-a-naming-convention-for-mysql](http://stackoverflow.com/questions/7899200/is-there-a-naming-convention-for-mysql)
- [http://vyaskn.tripod.com/object_naming.htm#Tables](http://vyaskn.tripod.com/object_naming.htm#Tables)
- [https://justinsomnia.org/2003/04/essential-database-naming-conventions-and-style/](https://justinsomnia.org/2003/04/essential-database-naming-conventions-and-style/)
