package io.confluent.kafka_tutorials.parser

import java.util

import org.asciidoctor.Asciidoctor
import org.asciidoctor.ast.ContentNode
import org.asciidoctor.converter.StringConverter
import org.junit.{Assert, Test}

import scala.collection.JavaConverters._
import scala.io.Source


class FooConverter(backend: String, opts: util.Map[String, Object]) extends StringConverter(backend, opts) {


  override def convert(node: ContentNode, transform: String, opts: util.Map[AnyRef, AnyRef]): String = {

    ""
  }
}


class CliTest {

  val sample: Iterator[String] = Source.fromResource("dummy.adoc").getLines()
  val adoctor: Asciidoctor = Asciidoctor.Factory.create()

  @Test
  def sanity(): Unit = {
    Assert.assertTrue(true)
    val ret = adoctor.convert(sample.mkString("\n"), Map.empty[String, Object].asJava)
    println(ret)
  }
}
