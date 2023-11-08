class Database {
    // El campo para almacenar la instancia singleton debe
    // declararse estático.
    private static instance: Database;

    // El constructor del singleton siempre debe ser privado
    // para evitar llamadas de construcción directas con el
    // operador `new`.
    private constructor() {
        // Algún código de inicialización, como la propia
        // conexión al servidor de una base de datos.
        // ...
    }

    // El método estático que controla el acceso a la instancia
    // singleton.
    public static getInstance(): Database {
        if (Database.instance == null) {
            // acquireThreadLock() and then
            // Garantiza que la instancia aún no se ha
            // inicializado por otro hilo mientras ésta ha
            // estado esperando el desbloqueo.
            if (Database.instance == null) {
                Database.instance = new Database();
            }
        }
        return Database.instance;
    }

    // Por último, cualquier singleton debe definir cierta
    // lógica de negocio que pueda ejecutarse en su instancia.
    public query(sql: string): void {
        // Por ejemplo, todas las consultas a la base de datos
        // de una aplicación pasan por este método. Por lo
        // tanto, aquí puedes colocar lógica de regularización
        // (throttling) o de envío a la memoria caché.
        // ...
    }
}

class Application {
    public main(): void {
        const foo: Database = Database.getInstance();
        foo.query("SELECT ...");
        // ...
        const bar: Database = Database.getInstance();
        bar.query("SELECT ...");
        // La variable `bar` contendrá el mismo objeto que la
        // variable `foo`.
    }
}

// Uso de la aplicación
const myApp: Application = new Application();
myApp.main();
