import java.util.*;

class Node{
    int value;
    Node left;
    Node right;

    Node(int value){
        this.value=value;
        left=null;
        right=null;
    }
}

class Main{
    public static void main(String[]args){
        Node root=new Node(10);

        root.left=new Node(5);
        root.right=new Node(9);

        root.left.left=new Node(67);
        root.left.right=new Node(45);

        root.right.left=new Node(90);
        root.right.right=new Node(34);

        preorder(root);
    }

    static void preorder(Node root){

        if(root==null){
            return;
        }

        System.out.print("Preorder:"+root.value+",");
        preorder(root.left);
        preorder(root.right);

    }

    static void inorder(Node root){

        if(root==null){
            return;
        }
        inorder(root.left);
        System.out.print("Inorder:"+root.value+",");
        inorder(root.right);
    }

    static void postorder(Node root){

        if(root==null){
            return;
        }
        postorder(root.left);
        postorder(root.right);
        System.out.print("Postorder:"+ root.value+",");
    }

}