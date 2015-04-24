package com.stuara.colorblind;

import java.awt.Canvas;
import java.awt.Dimension;

import javax.swing.JFrame;

public class Game extends Canvas implements Runnable {

	private static final long serialVersionUID = 1L;

	public static void main(String[] args) {

		Game game = new Game();
		game.setPreferredSize(new Dimension(400, 400));
		game.setMinimumSize(new Dimension(400, 400));

		JFrame frame = new JFrame();
		frame.add(game);
		frame.pack();
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setResizable(false);
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);

	}

	public void run() {}

}
