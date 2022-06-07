export class User {

    static __wrap(ptr) {
        const obj = Object.create(User.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }
}