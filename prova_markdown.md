# Guía Completa de Markdown

Markdown es un lenguaje de marcado ligero que permite formatear texto de manera sencilla y rápida. A continuación, se presentan todas sus características principales.

---

## 1. Encabezados

Se pueden crear encabezados utilizando el símbolo `#` seguido de un espacio:

```markdown
# Encabezado 1
## Encabezado 2
### Encabezado 3
#### Encabezado 4
##### Encabezado 5
###### Encabezado 6
```

### Ejemplo:

# Encabezado 1
## Encabezado 2
### Encabezado 3
#### Encabezado 4
##### Encabezado 5
###### Encabezado 6

---

## 2. Énfasis (Negrita, Cursiva y Tachado)

Se pueden aplicar diferentes estilos al texto:

```markdown
*Cursiva* o _Cursiva_
**Negrita** o __Negrita__
***Negrita y Cursiva***
~~Texto tachado~~
```

### Ejemplo:

*Cursiva* o _Cursiva_  
**Negrita** o __Negrita__  
***Negrita y Cursiva***  
~~Texto tachado~~

---

## 3. Listas

### 3.1 Listas No Ordenadas

Se crean con `-`, `+` o `*`:

```markdown
- Elemento 1
- Elemento 2
  - Sub-elemento 1
  - Sub-elemento 2
* Otro elemento
```

### Ejemplo:

- Elemento 1
- Elemento 2
  - Sub-elemento 1
  - Sub-elemento 2
* Otro elemento

### 3.2 Listas Ordenadas

Se crean con números seguidos de un punto:

```markdown
1. Primer elemento
2. Segundo elemento
3. Tercer elemento
```

### Ejemplo:

1. Primer elemento
2. Segundo elemento
3. Tercer elemento

---

## 4. Enlaces

Se pueden crear enlaces de la siguiente manera:

```markdown
[Texto del enlace](https://www.ejemplo.com)
[Texto con título](https://www.ejemplo.com "Título del enlace")
```

### Ejemplo:

[Visita OpenAI](https://openai.com)  
[Visita OpenAI con título](https://openai.com "OpenAI Website")

---

## 5. Imágenes

Para insertar imágenes se usa la misma sintaxis que los enlaces pero con un `!` al inicio:

```markdown
![Texto alternativo](https://www.ejemplo.com/imagen.jpg)
![Texto alternativo con título](https://www.ejemplo.com/imagen.jpg "Título de la imagen")
```

### Ejemplo:

![Ejemplo de imagen](https://via.placeholder.com/150)

---

## 6. Citas

Las citas se crean utilizando el símbolo `>`:

```markdown
> Esta es una cita.
>> Esta es una cita anidada.
```

### Ejemplo:

> Esta es una cita.  
>> Esta es una cita anidada.

---

## 7. Código

### 7.1 Código en Línea

Para resaltar código en línea se usan comillas invertidas `` ` ``:

```markdown
El comando `ls -l` muestra los archivos en un directorio.
```

### Ejemplo:

El comando `ls -l` muestra los archivos en un directorio.

### 7.2 Bloques de Código

Para bloques de código se utilizan tres comillas invertidas:

```markdown
```
Código aquí
```
```

Ejemplo con lenguaje especificado:

```markdown
```python
print("Hola, mundo!")
```
```

### Ejemplo:

```python
print("Hola, mundo!")
```

---

## 8. Tablas

Las tablas se crean usando tuberías `|` y guiones `-`:

```markdown
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |
| Dato A    | Dato B    | Dato C    |
```

### Ejemplo:

| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |
| Dato A    | Dato B    | Dato C    |

---

## 9. Separadores

Los separadores se crean con tres o más guiones `---`, asteriscos `***` o guiones bajos `___`:

```markdown
---
***
___
```

### Ejemplo:

---

***

___

---

## 10. Listas de Tareas

Se pueden hacer listas de tareas utilizando `- [ ]` para tareas pendientes y `- [x]` para tareas completadas:

```markdown
- [x] Tarea 1
- [ ] Tarea 2
- [ ] Tarea 3
```

### Ejemplo:

- [x] Tarea 1
- [ ] Tarea 2
- [ ] Tarea 3

---

## 11. Mención de Usuarios y Emojis (GitHub Flavored Markdown)

Algunas plataformas permiten mencionar usuarios con `@usuario` y utilizar emojis con `:emoji:`:

```markdown
@usuario ¡Hola! :smile:
```

### Ejemplo:

@usuario ¡Hola! 😄

---

## 12. Encabezados con Anclas

Algunas implementaciones permiten definir enlaces a secciones del mismo documento:

```markdown
[Ir a la Sección 2](#2-énfasis-negrita-cursiva-y-tachado)
```

---

## 13. Comentarios en Markdown

Algunas implementaciones permiten comentarios ocultos:

```markdown
<!-- Este es un comentario y no se mostrará en la salida -->
```

---

### Conclusión

Markdown es un lenguaje simple pero poderoso para formatear texto de manera rápida y eficiente. Se usa ampliamente en documentación, blogs, wikis y más.

---

