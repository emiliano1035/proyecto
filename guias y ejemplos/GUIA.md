# Guía Completa: Subir tu Proyecto a GitHub y Trabajar con Ramas

## Parte 1: Subir tu Proyecto a GitHub

### Prerequisitos
Antes de comenzar, asegúrate de tener:
- Git instalado en tu computadora
- Una cuenta en GitHub
- Tu proyecto listo en una carpeta local

### Paso 1: Crear un Repositorio en GitHub

1. Inicia sesión en GitHub
2. Haz clic en el botón "+" en la esquina superior derecha
3. Selecciona "New repository"
4. Completa la información:
   - **Repository name**: Nombre de tu proyecto
   - **Description**: Descripción opcional
   - **Public/Private**: Elige la visibilidad
   - **NO inicialices** con README si ya tienes código localmente
5. Haz clic en "Create repository"

### Paso 2: Inicializar Git en tu Proyecto Local

Abre la terminal en la carpeta de tu proyecto y ejecuta:

```bash
git init
```

Esto crea un repositorio Git local en tu proyecto.

### Paso 3: Añadir tus Archivos al Staging Area

```bash
git add .
```

El punto (.) añade todos los archivos. Si quieres añadir archivos específicos:

```bash
git add nombre-archivo.txt
```

### Paso 4: Hacer tu Primer Commit

```bash
git commit -m "Primer commit - Proyecto inicial"
```

El mensaje entre comillas describe los cambios realizados.

### Paso 5: Conectar tu Repositorio Local con GitHub

```bash
git remote add origin https://github.com/tu-usuario/nombre-repositorio.git
```

Reemplaza `tu-usuario` y `nombre-repositorio` con tus datos.

### Paso 6: Renombrar la Rama Principal (Opcional pero Recomendado)

GitHub usa "main" como rama principal por defecto:

```bash
git branch -M main
```

### Paso 7: Subir tu Código a GitHub

```bash
git push -u origin main
```

La primera vez puede pedirte tus credenciales de GitHub.

---

## Parte 2: ¿Qué son las Ramas (Branches)?

Las ramas en Git son líneas independientes de desarrollo. Imagina que tu proyecto es un árbol: el tronco principal (rama `main`) contiene el código estable, y las ramas son como ramificaciones donde puedes experimentar sin afectar el código principal.

### ¿Para qué sirven las ramas?

- **Desarrollo de nuevas funcionalidades** sin afectar el código principal
- **Experimentación** segura con nuevas ideas
- **Trabajo en equipo** donde cada persona trabaja en su propia rama
- **Corrección de bugs** de forma aislada
- **Gestión de diferentes versiones** del proyecto

---

## Parte 3: Crear y Gestionar Ramas

### Ver las Ramas Existentes

```bash
git branch
```

La rama actual se marca con un asterisco (*).

Para ver todas las ramas (incluyendo remotas):

```bash
git branch -a
```

### Crear una Nueva Rama

**Opción 1**: Crear la rama sin cambiarte a ella

```bash
git branch nombre-de-la-rama
```

**Opción 2**: Crear la rama y cambiarte automáticamente

```bash
git checkout -b nombre-de-la-rama
```

O con el comando más moderno:

```bash
git switch -c nombre-de-la-rama
```

### Ejemplos de Nombres de Ramas

```bash
git checkout -b feature/nueva-funcionalidad
git checkout -b bugfix/corregir-error-login
git checkout -b hotfix/error-critico
git checkout -b develop
```

---

## Parte 4: Cambiar entre Ramas

### Método 1: Usando `git checkout`

```bash
git checkout nombre-de-la-rama
```

Ejemplo:
```bash
git checkout main
git checkout feature/nueva-funcionalidad
```

### Método 2: Usando `git switch` (Recomendado - Más Moderno)

```bash
git switch nombre-de-la-rama
```

Ejemplo:
```bash
git switch main
git switch develop
```

### Volver a la Rama Anterior

```bash
git switch -
```

Esto es como un "deshacer" que te lleva a la rama donde estabas antes.

---

## Flujo de Trabajo Completo con Ramas

### Escenario: Añadir una nueva funcionalidad

**1. Asegúrate de estar en la rama principal actualizada**
```bash
git checkout main
git pull origin main
```

**2. Crea una nueva rama para tu funcionalidad**
```bash
git checkout -b feature/sistema-login
```

**3. Trabaja en tu código y haz commits**
```bash
# Edita tus archivos...
git add .
git commit -m "Añadir formulario de login"

# Más cambios...
git add .
git commit -m "Añadir validación de usuario"
```

**4. Sube tu rama a GitHub**
```bash
git push -u origin feature/sistema-login
```

**5. Cuando termines, regresa a main y fusiona**
```bash
git checkout main
git merge feature/sistema-login
```

**6. Sube los cambios a GitHub**
```bash
git push origin main
```

**7. Elimina la rama si ya no la necesitas**
```bash
git branch -d feature/sistema-login  # Local
git push origin --delete feature/sistema-login  # Remoto
```

---

## Comandos Útiles Adicionales

### Ver el Estado Actual
```bash
git status
```

### Ver el Historial de Commits
```bash
git log
git log --oneline  # Versión resumida
```

### Ver Diferencias entre Ramas
```bash
git diff main feature/nueva-funcionalidad
```

### Descartar Cambios No Guardados
```bash
git checkout -- nombre-archivo.txt
```

### Guardar Cambios Temporalmente (Stash)
Si necesitas cambiar de rama pero tienes cambios sin commitear:
```bash
git stash  # Guarda los cambios
git switch otra-rama
git switch -  # Vuelve a tu rama
git stash pop  # Recupera los cambios
```

---

## Consejos y Mejores Prácticas

1. **Commitea frecuentemente** con mensajes descriptivos
2. **Usa nombres descriptivos** para las ramas (feature/, bugfix/, hotfix/)
3. **Mantén la rama main siempre estable** y funcional
4. **Actualiza tu rama** regularmente desde main para evitar conflictos
5. **Borra las ramas** que ya no uses para mantener el repositorio limpio
6. **Crea un archivo .gitignore** para excluir archivos innecesarios:

```bash
# Ejemplo de .gitignore
node_modules/
.env
*.log
.DS_Store
```

---

## Resolución de Conflictos

Cuando fusionas ramas, pueden aparecer conflictos si ambas ramas modificaron las mismas líneas de código.

### Pasos para Resolver Conflictos

1. Git te indicará qué archivos tienen conflictos
2. Abre los archivos y busca las marcas de conflicto:
```
<<<<<<< HEAD
Tu código actual
=======
Código de la otra rama
>>>>>>> nombre-rama
```
3. Edita el archivo manualmente para decidir qué código mantener
4. Elimina las marcas de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`)
5. Añade los archivos resueltos:
```bash
git add archivo-resuelto.txt
```
6. Completa el merge:
```bash
git commit -m "Resolver conflictos al fusionar feature/nueva-funcionalidad"
```

---

## Trabajar con Pull Requests (PRs)

Las Pull Requests son la forma recomendada de fusionar código en GitHub, especialmente en equipos.

### Crear un Pull Request

1. Sube tu rama a GitHub:
```bash
git push -u origin feature/mi-funcionalidad
```

2. Ve a tu repositorio en GitHub
3. Verás un botón "Compare & pull request" - haz clic
4. Completa la información:
   - Título descriptivo
   - Descripción detallada de los cambios
   - Asigna revisores si trabajas en equipo
5. Haz clic en "Create pull request"

### Fusionar un Pull Request

1. Revisa los cambios en GitHub
2. Espera la aprobación de revisores (si aplica)
3. Haz clic en "Merge pull request"
4. Confirma el merge
5. Opcionalmente, elimina la rama remota después del merge

---

## Recursos Adicionales

- [Documentación oficial de Git](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)

---

¡Feliz codificación les desea su maestra Mar! 🚀