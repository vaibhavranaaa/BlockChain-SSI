import java.util.*;

class TreeNode{
    int value;
    Node left;
    Node right;

    TreeNode(int value){
        this.value=value;
        left=null;
        right=null;
    }
}

public class PostOrder {

    public static void main(String[]args){
        Node root=new Node(10);

        root.left=new Node(5);
        root.right=new Node(9);

        root.left.left=new Node(67);
        root.left.right=new Node(45);

        root.right.left=new Node(90);
        root.right.right=new Node(34);

        System.out.println(postorder(root));
        System.out.println(height(root));
    }
    static List<List<Integer>>postorder(Node root){
        List<List<Integer>> result=new ArrayList<>();

        if(root==null){
            return result;
        }
        Queue<Node>q=new LinkedList<>();
        q.add(root);

        while(!q.isEmpty()){
            int size=q.size();
            List<Integer> level=new ArrayList<>();

            for(int i=0;i<size;i++){
                Node curr=q.poll();

                level.add(curr.value);


                if(curr.left!=null){
                    q.add(curr.left);
                }
                if(curr.right!=null){
                    q.add(curr.right);
                }
            }
            result.add(level);
        }
        return result;
    }

    static int height(Node root){
        if(root==null){
            return 0;
        }
        int left=height(root.left);
        int right=height(root.right);


        return Math.max(left,right)+1;
    }


}
