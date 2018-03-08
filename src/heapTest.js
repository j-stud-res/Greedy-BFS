class Something
{
    constructor(num)
    {
        this.num = num;
    }

    CompareTo(otherItem)
    {
        return this.num - otherItem.num;
    }
}

let queue = new PriorityQueue();
queue.Push(new Something(1));
queue.Push(new Something(5));
queue.Push(new Something(11));
queue.Push(new Something(0));
queue.Push(new Something(4));
queue.Push(new Something(2));
queue.Push(new Something(18));
queue.Push(new Something(9));
queue.Push(new Something(7));
queue.Push(new Something(3));
console.log(queue.Pop().num);
console.log(queue.Pop().num);
console.log(queue.Pop().num);
console.log(queue.Pop().num);
console.log(queue.Pop().num);
console.log(queue.Pop().num);
console.log(queue.Pop().num);
