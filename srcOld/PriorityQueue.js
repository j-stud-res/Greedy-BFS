class PriorityQueue
{
	constructor(customCompare = undefined)
	{
		this.data = [];
		this.customCompare = customCompare;
	}

	Push(element)
	{
		this.data.push(element);
		this.HeapifyUp(this.data.length - 1);
	}

	Pop()
	{
		if(this.Count() == 0)
		{
			return undefined;
		}
		if(this.Count() == 1)
		{
			return this.data.pop();
		}
		this.Switch(0, this.data.length - 1);
		let element = this.data.pop();
		this.HeapifyDown(0);
		return element;
	}

	Count()
	{
		return this.data.length;
	}

	HeapifyUp(index)
	{
		let parent = this.GetParent(index);
		
		if(this.data[index] && this.data[parent])
		{
			let compare = this.Compare(this.data[parent], this.data[index]);
			if(compare < 0)
			{
				this.Switch(index, parent);
				this.HeapifyUp(parent);
			}
		}
	}

	HeapifyDown(index)
	{
		let lchild = this.GetLeftChild(index);
		let rchild = this.GetRightChild(index);
		if(lchild && rchild)
		{
			let compare = this.Compare(this.data[rchild], this.data[lchild]);
			if(compare > 0)
			{
				//rchild is greater
				this.Switch(index, rchild);
				this.HeapifyDown(rchild);
			} else
			{
				this.Switch(index, lchild);
				this.HeapifyDown(lchild);
			}
		} else if(lchild && this.Compare(this.data[index], this.data[lchild]) < 0)
		{
			this.Switch(index, lchild);
		}
	}

	GetParent(index)
	{
		return Math.trunc((index - 1) / 2);
	}

	GetLeftChild(index)
	{
		let child = 2 * index + 1;
		if(child >= this.data.length)
		{
			child = undefined;
		}
		return child;
	}

	GetRightChild(index)
	{
		let child = 2 * index + 2;
		if(child >= this.data.length)
		{
			child = undefined;
		}
		return child;
	}

	Switch(index1, index2)
	{
		let temp = this.data[index1];
		this.data[index1] = this.data[index2];
		this.data[index2] = temp;
	}

	Empty()
	{
		this.data = [];
	}

	Compare(item1, item2)
	{
		if(this.customCompare) {
			return this.customCompare(item1, item2);
		} else {
			return item1.CompareTo(item2);				
		}
	}
}