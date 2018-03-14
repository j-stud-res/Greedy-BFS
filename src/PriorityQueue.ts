export interface IComperable<T> {
	compareTo(item: T) : number;
}

export type customCompare<T> = (item1: T, item2: T) => number;

export class PriorityQueue<T extends IComperable<T>>
{
	private data: T[];
	private customcompare: customCompare<T> | undefined;
	
	constructor(customcompare: customCompare<T> | undefined = undefined)
	{
		this.data = [];
		this.customcompare = customcompare;
	}

	push(element: T)
	{
		this.data.push(element);
		this.heapifyUp(this.data.length - 1);
	}

	pop(): T | undefined
	{
		if(this.count() == 0)
		{
			return undefined;
		}
		if(this.count() == 1)
		{
			return this.data.pop();
		}
		this.switch(0, this.data.length - 1);
		let element = this.data.pop();
		this.heapifyDown(0);
		return element;
	}

	empty()
	{
		this.data = [];
	}

	count(): number
	{
		return this.data.length;
	}

	private heapifyUp(index: number)
	{
		let parent = this.getParent(index);
		
		if(this.data[index] && this.data[parent])
		{
			let compare = this.compare(this.data[parent], this.data[index]);
			if(compare < 0)
			{
				this.switch(index, parent);
				this.heapifyUp(parent);
			}
		}
	}

	private heapifyDown(index: number)
	{
		let lchild = this.getLeftChild(index);
		let rchild = this.getRightChild(index);
		if(lchild && rchild)
		{
			let compare = this.compare(this.data[rchild], this.data[lchild]);
			if(compare > 0)
			{
				//rchild is greater
				this.switch(index, rchild);
				this.heapifyDown(rchild);
			} else
			{
				this.switch(index, lchild);
				this.heapifyDown(lchild);
			}
		} else if(lchild && this.compare(this.data[index], this.data[lchild]) < 0)
		{
			this.switch(index, lchild);
		}
	}

	private getParent(index: number): number
	{
		return Math.floor((index - 1) / 2);
	}

	private getLeftChild(index: number): number | undefined
	{
		let child: number | undefined = 2 * index + 1;
		if(child >= this.data.length)
		{
			child = undefined;
		}
		return child;
	}

	private getRightChild(index: number): number | undefined
	{
		let child: number | undefined = 2 * index + 2;
		if(child >= this.data.length)
		{
			child = undefined;
		}
		return child;
	}

	private switch(index1: number, index2: number)
	{
		let temp = this.data[index1];
		this.data[index1] = this.data[index2];
		this.data[index2] = temp;
	}

	private compare(item1: T, item2: T)
	{
		if(this.customcompare) {
			return this.customcompare(item1, item2);
		} else {
			return item1.compareTo(item2);				
		}
	}
}